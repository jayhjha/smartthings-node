/// <reference types="request-promise" />
import * as rp from 'request-promise';
export default class Devices {
    personalAccessToken: string;
    constructor(personalAccessToken: string);
    listDevicesByLocation(locationId: string): rp.RequestPromise;
    listDevicesByCapability(capability: string): rp.RequestPromise;
    listDevicesByDeviceId(deviceId: string): rp.RequestPromise;
    listDevices(queryParams: {
        locationId?: string;
        capability?: string;
        deviceId?: string;
    }, smartAppToken?: string): rp.RequestPromise;
    installDevice(smartAppToken: string, body: {
        label?: string;
        locationId: string;
        app: {
            profileId: string;
            installedAppId: string;
            externalId?: string;
        };
    }): rp.RequestPromise;
    getDeviceDescription(deviceId: string, smartAppToken?: string): rp.RequestPromise;
    deleteDevice(deviceId: string, smartAppToken?: string): rp.RequestPromise;
    updateDevice(deviceId: string, label: string, smartAppToken?: string): rp.RequestPromise;
    executeDeviceCommand(deviceId: string, commands: Array<{}>, smartAppToken?: string): rp.RequestPromise;
    createDeviceEvents(deviceId: string, deviceEvents: Array<{}>, smartAppToken?: string): rp.RequestPromise;
    getDeviceStatus(deviceId: string, smartAppToken?: string): rp.RequestPromise;
    getDeviceComponentStatus(deviceId: string, componentId: string, smartAppToken?: string): rp.RequestPromise;
    getDeviceCapabilityStatus(deviceId: string, componentId: string, capability: string, smartAppToken?: string): rp.RequestPromise;
    getAuthToken(token: string | undefined): string;
}
