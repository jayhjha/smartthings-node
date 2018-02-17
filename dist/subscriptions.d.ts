/// <reference types="request-promise" />
import * as rp from 'request-promise';
export default class Subscriptions {
    personalAccessToken: string;
    constructor(personalAccessToken: string);
    listAppSubscriptions(installedAppId: string, smartAppToken?: string): rp.RequestPromise;
    createDeviceSubscriptions(installedAppId: string, deviceId: string, componentId: string, capability: string, attrribute: string, value: any, stateChangeOnly: boolean, subscriptionName: string, smartAppToken?: string): rp.RequestPromise;
    createCapabilitySubscriptions(installedAppId: string, locationId: string, capability: string, attrribute: string, value: any, stateChangeOnly: boolean, subscriptionName: string, smartAppToken?: string): rp.RequestPromise;
    deleteAllAppSubscriptions(installedAppId: string, deviceId?: string, smartAppToken?: string): rp.RequestPromise;
    getSubscriptionDetails(installedAppId: string, subscriptionId: string, smartAppToken?: string): rp.RequestPromise;
    deleteSpecificSubscriptions(installedAppId: string, subscriptionId: string, smartAppToken?: string): rp.RequestPromise;
    getAuthToken(token: string | undefined): string;
}
