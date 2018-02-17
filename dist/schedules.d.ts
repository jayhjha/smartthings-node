/// <reference types="request-promise" />
import * as rp from 'request-promise';
export default class Schedules {
    personalAccessToken: string;
    constructor(personalAccessToken: string);
    listAppSchedules(installedAppId: string, smartAppToken?: string): rp.RequestPromise;
    createOnceSchedule(installedAppId: string, scheduleName: string, time: number, overwrite: boolean, smartAppToken?: string): rp.RequestPromise;
    createCronSchedule(installedAppId: string, scheduleName: string, expression: string, timezone: string, smartAppToken?: string): rp.RequestPromise;
    deleteAllAppSchedules(installedAppId: string, smartAppToken?: string): rp.RequestPromise;
    getScheduleDetails(installedAppId: string, scheduleName: string, smartAppToken?: string): rp.RequestPromise;
    deleteSpecificSchedule(installedAppId: string, scheduleName: string, smartAppToken?: string): rp.RequestPromise;
    getAuthToken(token: string | undefined): string;
}
