import {Request, Response} from 'express';
import * as config from 'config';
import * as prettyjson from 'prettyjson';

import { SmartThings } from "smartthings-node";

import * as stConfig from './lib/config';
import * as weather from './lib/weather';

let st = new SmartThings(String(process.env.ST_PROD_TOKEN));
let prettyjsonOptions = {};

/**
 * Handle POST request from SmartThings Cloud for different lifecycles.
 * @param req 
 * @param res 
 */
export let handle = (req: Request, res: Response) => {
  let evt = req.body;
  let lifecycle = evt.lifecycle;
  
  console.log(`${lifecycle} lifecylce. Request body: `);
  console.log(prettyjson.render(evt, prettyjsonOptions));

  switch(lifecycle) {
    case 'PING': {
      let challenge = evt.pingData.challenge;
      res.json({statusCode: 200, pingData: {challenge: challenge}});
      break;
    }
    case 'CONFIGURATION' : {
      let configRes = stConfig.handle(evt.configurationData);
      console.log("CONFIGURATION response:");
      console.log(prettyjson.render({configurationData: configRes}, prettyjsonOptions));
      res.json({statusCode: 200, configurationData: configRes});
      break;
    }
    case 'INSTALL': {
      let installToken : string = evt.installData.authToken;
      setBulbColor(evt.installData.installedApp, installToken);
      createSchedule(evt.installData.installedApp, installToken);
      res.json({statusCode: 200, installData: {}});
      break;
    }
    case 'UPDATE': {
      let updateToken : string = evt.updateData.authToken;
      setBulbColor(evt.updateData.installedApp, updateToken);
      createSchedule(evt.updateData.installedApp, updateToken);
      res.json({statusCode: 200, installData: {}});
      break;
    }
    case 'UNINSTALL': {
      res.json({statusCode: 200, uninstallData: {}});
      break;
    }
    case 'EVENT':{
      handleEvent(evt.eventData);
      res.json({statusCode: 200, eventData: {}});
      break;
    }
    default: {
      console.log(`Lifecycle ${lifecycle} not supported`);
    }
  }
}

/**
 * Handle Timer Event (created by the schedule) sent by SmartThings Cloud every minute and 
 * set bulb color based on the new temperature value
 * @param eventData 
 */
let handleEvent = (eventData: any) => {
  const eventType = eventData.events[0].eventType;
  const token = eventData.authToken;
  if (eventType === "TIMER_EVENT") {
    let timerEvent = eventData.events[0].timerEvent;
    console.log(`Received timer event for schedule ${timerEvent.name} at ${timerEvent.time}`);
    setBulbColor(eventData.installedApp, token);
  } else {
    console.error(`This app only expects TIMER_EVENTs. Got ${eventType}`)
  }
}

/**
 * Send command to the bulb to set the color as determined by parsing the weather and brightness 
 * level to a fixed value of 20.
 * @param installedApp Installed App Details sent by the SmartThings Cloud
 * @param token Smart App token sent by the SmartThings Cloud as part of Event data
 */
let setBulbColor = (installedApp: any, token: string) => {
  const cityName : string = installedApp.config.cityName[0].stringConfig.value;
  const deviceId : string = installedApp.config.colorLight[0].deviceConfig.deviceId;

  weather.getCurrentWeather(cityName)
  .then(weather => {
    const color = getColorForWeather(weather);
    let commands = [
      {
        command: 'on',
        capability: 'switch',
        component: 'main',
        arguments: []
      },
      {
        command: 'setLevel',
        capability: 'switchLevel',
        component: 'main',
        arguments: [20]
      },
      {
        command: 'setColor',
        capability: 'colorControl',
        component: 'main',
        arguments: [color]
      }
    ];
    st.devices.executeDeviceCommand(deviceId, commands, token)
    .then(deviceCommandResponse => {
      console.log('Successfull=y sent device commands');
      console.log(prettyjson.render(deviceCommandResponse, prettyjsonOptions));
    })
    .catch(cmdErr => {
      console.error('Error executing command');
      console.error(prettyjson.render(cmdErr, prettyjsonOptions));
    })
  })
  .catch(weatherError => {
    console.error("Error getting current weather conditions:");
    console.error(prettyjson.render(weatherError, prettyjsonOptions));
  });
}


/**
 * Parse the weather data response to find current temperature and conditions and assign a color 
 * accordingly.
 * Cold :: Blue
 * Hot :: Orange
 * Rain/Snow :: Purple
 * Other:: White
 *
 * @param weather - weather data from OpenWeatherMap API 
 */
let getColorForWeather = (weather: any) => {
  let condition = weather[0].main;
  let temp = weather.main.temp;

  let precip : boolean = false;
  let heat : boolean = false;
  let cold : boolean = false;

  
  if (condition === 'Snow' || condition === 'Rain' || condition == 'Mist') {
    precip = true;
  } else if (temp < 10) {
    cold = true;
  } else if (temp > 25) {
    heat = true;
  }

  let hue = 0;
  let saturation = 100;
  if (precip) {
    // precipitation: Purple
    hue = 75;
  } else if (heat) {
    // heat: red
    hue = 10;
  } else if (cold) {
    // cold: blue
    hue = 70;
  } else {
    // normal: soft whitelet weather = weather.list.slice(0, 1);
    hue = 79;
    saturation = 7;
  }

  let colorMap = {hue: hue, saturation: saturation};
  console.log(`Color values: ${prettyjson.render(colorMap, prettyjsonOptions)}`);
  return colorMap;
}

/**
 * Delete all current schedule for app and create a new schedule.
 * @param installedApp 
 * @param token 
 */
let createSchedule = (installedApp: any, token: string) => {
  st.schedules.deleteAllAppSchedules(installedApp.installedAppId, token)
  .then(deleteSchedulesResp => {
    return st.schedules.createCronSchedule(installedApp.installedAppId, 'weather-check-schedule', `0/1 * * * ? *`, 'UTC', token);
  })
  .then(createScheduleResp => {
    console.log('Successfully created schedule');
  })
  .catch(scheduleCreationErr => {
    console.log("Error creating schedule:");
    console.log(prettyjson.render(scheduleCreationErr, prettyjsonOptions));
  })
}
