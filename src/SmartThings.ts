import * as rp from 'request-promise';

import Devices from './devices';
import Apps from './apps';
import InstalledApps from './installedapps';

export class SmartThings {
  protected personalAccessToken: string;
  public devices : Devices;
  public apps: Apps;
  public installedApps: InstalledApps;

  constructor(personalAccessToken: string) {
    this.personalAccessToken = personalAccessToken;
    this.devices = new Devices(this.personalAccessToken);
    this.apps = new Apps(this.personalAccessToken);
    this.installedApps = new InstalledApps(this.personalAccessToken);
  }
}