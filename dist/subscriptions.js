"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestbuilder_1 = require("./requestbuilder");
class Subscriptions {
    constructor(personalAccessToken) {
        this.personalAccessToken = personalAccessToken;
    }
    listAppSubscriptions(installedAppId, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        return requestbuilder_1.default(authToken, `installedapps/${installedAppId}/subscriptions`, 'GET');
    }
    createDeviceSubscriptions(installedAppId, deviceId, componentId, capability, attrribute, value, stateChangeOnly, subscriptionName, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        let body = {
            sourceType: "DEVICE",
            device: {
                deviceId: deviceId,
                componentId: componentId,
                capability: capability,
                attrribute: attrribute,
                value: value,
                stateChangeOnly: stateChangeOnly,
                subscriptionName: subscriptionName
            }
        };
        return requestbuilder_1.default(authToken, `installedapps/${installedAppId}/subscriptions`, 'POST', body);
    }
    createCapabilitySubscriptions(installedAppId, locationId, capability, attrribute, value, stateChangeOnly, subscriptionName, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        let body = {
            sourceType: "CAPABILITY",
            capability: {
                locationId: locationId,
                capability: capability,
                attrribute: attrribute,
                value: value,
                stateChangeOnly: stateChangeOnly,
                subscriptionName: subscriptionName
            }
        };
        return requestbuilder_1.default(authToken, `installedapps/${installedAppId}/subscriptions`, 'POST', body);
    }
    deleteAllAppSubscriptions(installedAppId, deviceId, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        let queryParams = {};
        if (deviceId) {
            queryParams = { deviceId: deviceId };
        }
        return requestbuilder_1.default(authToken, `installedapps/${installedAppId}/subscriptions`, 'DELETE', queryParams);
    }
    getSubscriptionDetails(installedAppId, subscriptionId, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        return requestbuilder_1.default(authToken, `installedapps/${installedAppId}/subscriptions/${subscriptionId}`, 'GET');
    }
    deleteSpecificSubscriptions(installedAppId, subscriptionId, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        return requestbuilder_1.default(authToken, `installedapps/${installedAppId}/subscriptions/${subscriptionId}`, 'DELETE');
    }
    getAuthToken(token) {
        if (token) {
            return token;
        }
        return this.personalAccessToken;
    }
}
exports.default = Subscriptions;
