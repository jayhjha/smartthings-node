import * as rp from 'request-promise';
import buildRequest from './requestbuilder';

export default class Schedules {
  authToken: string;

  constructor(authToken: string) {
    this.authToken = authToken;
  }

  listAppSchedules(installedAppId: string) : rp.RequestPromise {
    return buildRequest(this.authToken, `installedApps/${installedAppId}/schedules`, 'GET');
  }

  createOnceSchedule(installedAppId: string, scheduleName: string, time: number, overwrite: boolean) {
    let body = {
      scheduleName: scheduleName,
      once: {
        time: time,
        overwrite: overwrite
      }
    }
    return buildRequest(this.authToken, `installedApps/${installedAppId}/schedules`, 'POST', body);
  }

  createCronSchedule(installedAppId: string, scheduleName: string, expression: string, timezone: string) {
    let body = {
      scheduleName: scheduleName,
      cron: {
        expression: expression,
        timezone: timezone
      }
    }
    return buildRequest(this.authToken, `installedApps/${installedAppId}/schedules`, 'POST', body);
  }
 
  deleteAllAppSchedules(installedAppId: string) : rp.RequestPromise {
    return buildRequest(this.authToken, `installedApps/${installedAppId}/schedules`, 'DELETE');
  }

  getScheduleDetails(installedAppId: string, scheduleName: string) : rp.RequestPromise {
    return buildRequest(this.authToken, `installedApps/${installedAppId}/schedules/${scheduleName}`, 'GET');
  }

  deleteSpecificSchedule(installedAppId: string, scheduleName: string) : rp.RequestPromise {
    return buildRequest(this.authToken, `installedApps/${installedAppId}/schedules/${scheduleName}`, 'DELETE');
  }
}