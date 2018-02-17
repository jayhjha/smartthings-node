"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestbuilder_1 = require("./requestbuilder");
class InstalledApps {
    constructor(personalAccessToken) {
        this.personalAccessToken = personalAccessToken;
    }
    listInstalledApps(locationId, installedAppStatus, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        let queryParams = {};
        if (installedAppStatus) {
            queryParams = { locationId: locationId, installedAppStatus: installedAppStatus };
        }
        else {
            queryParams = { locationId: locationId };
        }
        return requestbuilder_1.default(authToken, `installedapps`, 'GET', queryParams);
    }
    getInstalledApp(installedAppId, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        return requestbuilder_1.default(authToken, `installedapps/${installedAppId}`, 'GET');
    }
    deleteInstalledApp(installedAppId, locationId, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        let queryParams = {};
        if (locationId) {
            queryParams = { locationId: locationId };
        }
        return requestbuilder_1.default(authToken, `installedapps/${installedAppId}`, 'DELETE', queryParams);
    }
    getInstalledAppConfig(installedAppId, configStatus, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        let queryParams = {};
        if (configStatus) {
            queryParams = { configStatus: configStatus };
        }
        return requestbuilder_1.default(authToken, `installedapps/${installedAppId}/configs`, 'GET', queryParams);
    }
    getInstalledAppConfigEntries(installedAppId, configId, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        return requestbuilder_1.default(authToken, `installedapps/${installedAppId}/configs/${configId}`, 'GET');
    }
    getAuthToken(token) {
        if (token) {
            return token;
        }
        return this.personalAccessToken;
    }
}
exports.default = InstalledApps;
