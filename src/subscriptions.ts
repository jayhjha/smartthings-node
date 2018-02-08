import * as rp from 'request-promise';
import buildRequest from './requestbuilder';

export default class Subscriptions {
  authToken: string;

  constructor(authToken: string) {
    this.authToken = authToken;
  }

  listAppSubscriptions(installedAppId: string) : rp.RequestPromise {
    return buildRequest(this.authToken, `installedApps/${installedAppId}/subscriptions`, 'GET');
  }

  createDeviceSubscriptions(installedAppId: string, deviceId: string, componentId: string, capability: string, 
                            attrribute: string, value: object, stateChangeOnly: boolean, subscriptionName: string) {
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
    return buildRequest(this.authToken, `installedApps/${installedAppId}/subscriptions`, 'POST', body);
  }

  createCapabilitySubscriptions(installedAppId: string, locationId: string, capability: string, attrribute: string, 
                                value: object, stateChangeOnly: boolean, subscriptionName: string) {
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
    return buildRequest(this.authToken, `installedApps/${installedAppId}/subscriptions`, 'POST', body);
  }
 
  deleteAllAppSubscriptions(installedAppId: string, deviceId?: string) : rp.RequestPromise {
    let queryParams = {};
    if (deviceId) {
      queryParams = {deviceId: deviceId};
    }
    return buildRequest(this.authToken, `installedApps/${installedAppId}/subscriptions`, 'DELETE', queryParams);
  }

  getSubscriptionDetails(installedAppId: string, subscriptionId: string) : rp.RequestPromise {
    return buildRequest(this.authToken, `installedApps/${installedAppId}/subscriptions/${subscriptionId}`, 'GET');
  }

  deleteSpecificSubscriptions(installedAppId: string, subscriptionId: string) : rp.RequestPromise {
    return buildRequest(this.authToken, `installedApps/${installedAppId}/subscriptions/${subscriptionId}`, 'DELETE');
  }
}