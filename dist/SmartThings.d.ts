import Apps from './apps';
import Devices from './devices';
import DeviceProfiles from './deviceprofiles';
import InstalledApps from './installedapps';
import Locations from './locations';
import Subscriptions from './subscriptions';
import Schedules from './schedules';
export declare class SmartThings {
    protected personalAccessToken: string;
    apps: Apps;
    devices: Devices;
    deviceProfiles: DeviceProfiles;
    installedApps: InstalledApps;
    locations: Locations;
    subscriptions: Subscriptions;
    schedules: Schedules;
    constructor(personalAccessToken: string);
}
