import Apps from './apps';
import Devices from './devices';
import DeviceProfiles from './deviceprofiles';
import InstalledApps from './installedapps';
import Locations from './locations';
import Subscriptions from './subscriptions';
import Schedules from './schedules';

export class SmartThings {
  protected personalAccessToken: string;
  
  public apps: Apps;
  public devices : Devices;
  public deviceProfiles: DeviceProfiles;
  public installedApps: InstalledApps;
  public locations: Locations;
  public subscriptions: Subscriptions;
  public schedules: Schedules;

  constructor(personalAccessToken: string) {
    this.personalAccessToken = personalAccessToken;
    this.apps = new Apps(this.personalAccessToken);
    this.deviceProfiles = new DeviceProfiles(this.personalAccessToken);
    this.devices = new Devices(this.personalAccessToken);
    this.installedApps = new InstalledApps(this.personalAccessToken);
    this.locations = new Locations(this.personalAccessToken);
    this.subscriptions = new Subscriptions(this.personalAccessToken);
    this.schedules = new Schedules(this.personalAccessToken);
  }
}