import * as rp from 'request-promise';

import Devices from './devices';
import Apps from './apps';
import InstalledApps from './installedapps';
import Locations from './locations';

export class SmartThings {
  protected personalAccessToken: string;
  public devices : Devices;
  public apps: Apps;
  public installedApps: InstalledApps;
  public locations: Locations;

  constructor(personalAccessToken: string) {
    this.personalAccessToken = personalAccessToken;
    this.devices = new Devices(this.personalAccessToken);
    this.apps = new Apps(this.personalAccessToken);
    this.installedApps = new InstalledApps(this.personalAccessToken);
    this.locations = new Locations(this.personalAccessToken);
  }
}