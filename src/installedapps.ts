import * as rp from 'request-promise';
import buildRequest from './requestbuilder';

export default class InstalledApps {
  authToken: string;

  constructor(authToken: string) {
    this.authToken = authToken;
  }

  listInstalledApps(locationId: string, installedAppStatus?: string) {
    let queryParams = {};
    if (installedAppStatus) {
      queryParams = {locationId: locationId, installedAppStatus: installedAppStatus};
    } else {
      queryParams = {locationId: locationId};
    }
    return buildRequest(this.authToken, `installedapps`, 'GET', queryParams);
  }

  getInstalledApp(installedAppId: string) {
    return buildRequest(this.authToken, `installedApps/${installedAppId}`, 'GET');
  }

  deleteInstalledApp(installedAppId: string, locationId?: string) {
    let queryParams = {};
    if (locationId) {
      queryParams = {locationId: locationId};
    }
    return buildRequest(this.authToken, `installedApps/${installedAppId}`, 'DELETE', queryParams);
  }
  
  getInstalledAppConfig(installedAppId: string, configStatus?: string) {
    let queryParams = {};
    if (configStatus) {
      queryParams = {configStatus: configStatus};
    }
    return buildRequest(this.authToken, `installedApps/${installedAppId}/configs`, 'GET', queryParams);
  }

  getInstalledAppConfigEntries(installedAppId: string, configId: string) {
    return buildRequest(this.authToken, `installedApps/${installedAppId}/configs/${configId}`, 'GET');
  }
}