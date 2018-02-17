/// <reference types="request-promise" />
import * as rp from 'request-promise';
export declare class DeviceComponent {
    id: string;
    capabilities: Array<String>;
    constructor(id: string, capabilities: Array<string>);
}
export default class DeviceProfiles {
    personalAccessToken: string;
    constructor(personalAccessToken: string);
    listDeviceProfiles(): rp.RequestPromise;
    createDeviceProfile(name: string, components: Array<DeviceComponent>, metadata?: {}): rp.RequestPromise;
    getDeviceProfileDescription(deviceProfileId: string): rp.RequestPromise;
    deleteDeviceProfile(deviceProfileId: string): rp.RequestPromise;
}
