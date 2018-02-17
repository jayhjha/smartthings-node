"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestbuilder_1 = require("./requestbuilder");
class Schedules {
    constructor(personalAccessToken) {
        this.personalAccessToken = personalAccessToken;
    }
    listAppSchedules(installedAppId, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        return requestbuilder_1.default(authToken, `installedapps/${installedAppId}/schedules`, 'GET');
    }
    createOnceSchedule(installedAppId, scheduleName, time, overwrite, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        let body = {
            name: scheduleName,
            once: {
                time: time,
                overwrite: overwrite
            }
        };
        return requestbuilder_1.default(authToken, `installedapps/${installedAppId}/schedules`, 'POST', body);
    }
    createCronSchedule(installedAppId, scheduleName, expression, timezone, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        let body = {
            name: scheduleName,
            cron: {
                expression: expression,
                timezone: timezone
            }
        };
        return requestbuilder_1.default(authToken, `installedapps/${installedAppId}/schedules`, 'POST', body);
    }
    deleteAllAppSchedules(installedAppId, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        return requestbuilder_1.default(authToken, `installedapps/${installedAppId}/schedules`, 'DELETE');
    }
    getScheduleDetails(installedAppId, scheduleName, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        return requestbuilder_1.default(authToken, `installedapps/${installedAppId}/schedules/${scheduleName}`, 'GET');
    }
    deleteSpecificSchedule(installedAppId, scheduleName, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        return requestbuilder_1.default(authToken, `installedapps/${installedAppId}/schedules/${scheduleName}`, 'DELETE');
    }
    getAuthToken(token) {
        if (token) {
            return token;
        }
        return this.personalAccessToken;
    }
}
exports.default = Schedules;
