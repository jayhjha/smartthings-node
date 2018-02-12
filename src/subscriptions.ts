import * as rp from 'request-promise';
import buildRequest from './requestbuilder';

export default class Subscriptions {
  personalAccessToken: string;

  constructor(personalAccessToken: string) {
    this.personalAccessToken = personalAccessToken;
  }

  listAppSubscriptions(installedAppId: string, smartAppToken?: string) : rp.RequestPromise {
    let authToken = this.getAuthToken(smartAppToken);
    return buildRequest(authToken, `installedApps/${installedAppId}/subscriptions`, 'GET');
  }

  createDeviceSubscriptions(installedAppId: string, deviceId: string, componentId: string, 
                            capability: string, attrribute: string, value: object, 
                            stateChangeOnly: boolean, subscriptionName: string, smartAppToken?: string) : rp.RequestPromise {
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
    }
    return buildRequest(authToken, `installedApps/${installedAppId}/subscriptions`, 'POST', body);
  }

  createCapabilitySubscriptions(installedAppId: string, locationId: string, capability: string, 
                                attrribute: string, value: object, stateChangeOnly: boolean, 
                                subscriptionName: string, smartAppToken?: string) : rp.RequestPromise {
    let authToken = this.getAuthToken(smartAppToken);
    let body = {
      sourceType: "CAPABILITY",
      device: {
        locationId: locationId,
        capability: capability,
        attrribute: attrribute,
        value: value,
        stateChangeOnly: stateChangeOnly,
        subscriptionName: subscriptionName
      }
    }
    return buildRequest(authToken, `installedApps/${installedAppId}/subscriptions`, 'POST', body);
  }
 
  deleteAllAppSubscriptions(installedAppId: string, deviceId?: string, smartAppToken?: string) : rp.RequestPromise {
    let authToken = this.getAuthToken(smartAppToken);
    let queryParams = {};
    if (deviceId) {
      queryParams = {deviceId: deviceId};
    }
    return buildRequest(authToken, `installedApps/${installedAppId}/subscriptions`, 'DELETE', queryParams);
  }

  getSubscriptionDetails(installedAppId: string, subscriptionId: string, smartAppToken?: string) : rp.RequestPromise {
    let authToken = this.getAuthToken(smartAppToken);
    return buildRequest(authToken, `installedApps/${installedAppId}/subscriptions/${subscriptionId}`, 'GET');
  }

  deleteSpecificSubscriptions(installedAppId: string, subscriptionId: string, smartAppToken?: string) : rp.RequestPromise {
    let authToken = this.getAuthToken(smartAppToken);
    return buildRequest(authToken, `installedApps/${installedAppId}/subscriptions/${subscriptionId}`, 'DELETE');
  }

  getAuthToken(token: string | undefined) : string {
    if (token) {
      return token;
    }
    return this.personalAccessToken;
  }
}