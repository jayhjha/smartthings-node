import * as rp from 'request-promise';
import buildRequest from './requestbuilder';

export default class Schedules {
  personalAccessToken: string;

  constructor(personalAccessToken: string) {
    this.personalAccessToken = personalAccessToken;
  }

  listAppSchedules(installedAppId: string, smartAppToken?: string) : rp.RequestPromise {
    let authToken = this.getAuthToken(smartAppToken);
    return buildRequest(authToken, `installedapps/${installedAppId}/schedules`, 'GET');
  }

  createOnceSchedule(installedAppId: string, scheduleName: string, time: number, overwrite: boolean,
                     smartAppToken?: string) : rp.RequestPromise {
    let authToken = this.getAuthToken(smartAppToken);
    let body = {
      name: scheduleName,
      once: {
        time: time,
        overwrite: overwrite
      }
    }
    return buildRequest(authToken, `installedapps/${installedAppId}/schedules`, 'POST', body);
  }

  createCronSchedule(installedAppId: string, scheduleName: string, expression: string, timezone: string, 
                     smartAppToken?: string) : rp.RequestPromise {
    let authToken = this.getAuthToken(smartAppToken);
    let body = {
      name: scheduleName,
      cron: {
        expression: expression,
        timezone: timezone
      }
    }
    return buildRequest(authToken, `installedapps/${installedAppId}/schedules`, 'POST', body);
  }
 
  deleteAllAppSchedules(installedAppId: string, smartAppToken?: string) : rp.RequestPromise {
    let authToken = this.getAuthToken(smartAppToken);
    return buildRequest(authToken, `installedapps/${installedAppId}/schedules`, 'DELETE');
  }

  getScheduleDetails(installedAppId: string, scheduleName: string, smartAppToken?: string) : rp.RequestPromise {
    let authToken = this.getAuthToken(smartAppToken);
    return buildRequest(authToken, `installedapps/${installedAppId}/schedules/${scheduleName}`, 'GET');
  }

  deleteSpecificSchedule(installedAppId: string, scheduleName: string, smartAppToken?: string) : rp.RequestPromise {
    let authToken = this.getAuthToken(smartAppToken);
    return buildRequest(authToken, `installedapps/${installedAppId}/schedules/${scheduleName}`, 'DELETE');
  }

  getAuthToken(token: string | undefined) : string {
    if (token) {
      return token;
    }
    return this.personalAccessToken;
  }
}