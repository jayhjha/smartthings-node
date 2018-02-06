import * as rp from 'request-promise';
import buildRequest from './requestbuilder';

export default class InstalledApps {
  personalAccessToken: string;

  constructor(personalAccessToken: string) {
    this.personalAccessToken = personalAccessToken;
  }

  listInstalledApps(locationId: string, installedAppStatus?: string) {
    let queryParams = {};
    if (installedAppStatus) {
      queryParams = {locationId: locationId, installedAppStatus: installedAppStatus};
    } else {
      queryParams = {locationId: locationId};
    }
    return buildRequest(this.personalAccessToken, `installedapps`, 'GET', queryParams);
  }

  getInstalledApp(installedAppId: string) {
    return buildRequest(this.personalAccessToken, `installedApps/${installedAppId}`, 'GET');
  }

  deleteInstalledApp(installedAppId: string, locationId?: string) {
    let queryParams = {};
    if (locationId) {
      queryParams = {locationId: locationId};
    }
    return buildRequest(this.personalAccessToken, `installedApps/${installedAppId}`, 'DELETE', queryParams);
  }
  
  getInstalledAppConfig(installedAppId: string, configStatus?: string) {
    let queryParams = {};
    if (configStatus) {
      queryParams = {configStatus: configStatus};
    }
    return buildRequest(this.personalAccessToken, `installedApps/${installedAppId}/configs`, 'GET', queryParams);
  }

  getInstalledAppConfigEntries(installedAppId: string, configId: string) {
    return buildRequest(this.personalAccessToken, `installedApps/${installedAppId}/configs/${configId}`, 'GET');
  }
}