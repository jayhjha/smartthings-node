"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestbuilder_1 = require("./requestbuilder");
class Apps {
    constructor(personalAccessToken) {
        this.personalAccessToken = personalAccessToken;
    }
    createWebHookApp(appName, displayName, description, targetUrl, singleInstance, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        let body = {
            appName: appName,
            displayName: displayName,
            description: description,
            singleInstance: singleInstance,
            appType: 'WEBHOOK_SMART_APP',
            webhookSmartApp: {
                targetUrl: targetUrl
            }
        };
        return requestbuilder_1.default(authToken, 'apps', 'POST', body);
    }
    createLambdaApp(appName, displayName, description, functions, singleInstance, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        let body = {
            appName: appName,
            displayName: displayName,
            description: description,
            singleInstance: singleInstance,
            appType: 'LAMBDA_SMART_APP',
            lambdaSmartApp: {
                functions: functions
            }
        };
        return requestbuilder_1.default(authToken, 'apps', 'POST', body);
    }
    listApps(appType, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        let queryParams = {};
        if (appType) {
            queryParams = { appType: appType };
        }
        return requestbuilder_1.default(authToken, 'apps', 'GET', queryParams);
    }
    getAppDetails(appNameOrId) {
        return requestbuilder_1.default(this.personalAccessToken, `apps/${appNameOrId}`, 'GET');
    }
    updateWebHookApp(appNameOrId, appName, displayName, description, targetUrl, singleInstance, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        let body = {
            appName: appName,
            displayName: displayName,
            description: description,
            singleInstance: singleInstance,
            appType: 'WEBHOOK_SMART_APP',
            webhookSmartApp: {
                targetUrl: targetUrl
            }
        };
        return requestbuilder_1.default(authToken, `apps/${appNameOrId}`, 'PUT', body);
    }
    updateLambdaApp(appNameOrId, appName, displayName, description, functions, singleInstance, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        let body = {
            appName: appName,
            displayName: displayName,
            description: description,
            singleInstance: singleInstance,
            appType: 'LAMBDA_SMART_APP',
            lambdaSmartApp: {
                functions: functions
            }
        };
        return requestbuilder_1.default(authToken, `apps/${appNameOrId}`, 'PUT', body);
    }
    deleteApp(appNameOrId, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        return requestbuilder_1.default(authToken, `apps/${appNameOrId}`, 'DELETE');
    }
    getAppSettings(appNameOrId) {
        return requestbuilder_1.default(this.personalAccessToken, `apps/${appNameOrId}/settings`, 'GET');
    }
    updateAppSettings(appNameOrId, settings, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        let body = { settings: settings };
        return requestbuilder_1.default(authToken, `apps/${appNameOrId}/settings`, 'PUT', body);
    }
    getAppOAuthSettings(appNameOrId) {
        return requestbuilder_1.default(this.personalAccessToken, `apps/${appNameOrId}/oauth`, 'GET');
    }
    updateAppOAuthSettings(appNameOrId, body, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        return requestbuilder_1.default(authToken, `apps/${appNameOrId}/oauth`, 'PUT', body);
    }
    generateAppOAuthClientSecret(appNameOrId, body, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        return requestbuilder_1.default(authToken, `apps/${appNameOrId}/oauth/generate`, 'POST', body);
    }
    getAuthToken(token) {
        if (token) {
            return token;
        }
        return this.personalAccessToken;
    }
}
exports.default = Apps;
