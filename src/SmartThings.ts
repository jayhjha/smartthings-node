import Apps from './apps';
import Devices from './devices';
import DeviceProfiles from './deviceprofiles';
import InstalledApps from './installedapps';
import Locations from './locations';
import Subscriptions from './subscriptions';
import Schedules from './schedules';

export class SmartThings {
  protected authToken: string;
  
  public apps: Apps;
  public devices : Devices;
  public deviceProfiles: DeviceProfiles;
  public installedApps: InstalledApps;
  public locations: Locations;
  public subscriptions: Subscriptions;
  public schedules: Schedules;

  constructor(authToken: string) {
    this.authToken = authToken;
    this.apps = new Apps(this.authToken);
    this.deviceProfiles = new DeviceProfiles(this.authToken);
    this.devices = new Devices(this.authToken);
    this.installedApps = new InstalledApps(this.authToken);
    this.locations = new Locations(this.authToken);
    this.subscriptions = new Subscriptions(this.authToken);
    this.schedules = new Schedules(this.authToken);
  }
}