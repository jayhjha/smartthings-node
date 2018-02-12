import * as rp from 'request-promise';
import buildRequest from './requestbuilder';

export default class InstalledApps {
  personalAccessToken: string;

  constructor(personalAccessToken: string) {
    this.personalAccessToken = personalAccessToken;
  }

  listInstalledApps(locationId: string, installedAppStatus?: string, smartAppToken?: string) {
    let authToken = this.getAuthToken(smartAppToken);
    let queryParams = {};
    if (installedAppStatus) {
      queryParams = {locationId: locationId, installedAppStatus: installedAppStatus};
    } else {
      queryParams = {locationId: locationId};
    }
    return buildRequest(authToken, `installedapps`, 'GET', queryParams);
  }

  getInstalledApp(installedAppId: string, smartAppToken?: string) {
    let authToken = this.getAuthToken(smartAppToken);
    return buildRequest(authToken, `installedApps/${installedAppId}`, 'GET');
  }

  deleteInstalledApp(installedAppId: string, locationId?: string, smartAppToken?: string) {
    let authToken = this.getAuthToken(smartAppToken);
    let queryParams = {};
    if (locationId) {
      queryParams = {locationId: locationId};
    }
    return buildRequest(authToken, `installedApps/${installedAppId}`, 'DELETE', queryParams);
  }
  
  getInstalledAppConfig(installedAppId: string, configStatus?: string, smartAppToken?: string) {
    let authToken = this.getAuthToken(smartAppToken);
    let queryParams = {};
    if (configStatus) {
      queryParams = {configStatus: configStatus};
    }
    return buildRequest(authToken, `installedApps/${installedAppId}/configs`, 'GET', queryParams);
  }

  getInstalledAppConfigEntries(installedAppId: string, configId: string, smartAppToken?: string) {
    let authToken = this.getAuthToken(smartAppToken);
    return buildRequest(authToken, `installedApps/${installedAppId}/configs/${configId}`, 'GET');
  }

  getAuthToken(token: string | undefined) : string {
    if (token) {
      return token;
    }
    return this.personalAccessToken;
  }
}