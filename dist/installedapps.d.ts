/// <reference types="request-promise" />
import * as rp from 'request-promise';
export default class InstalledApps {
    personalAccessToken: string;
    constructor(personalAccessToken: string);
    listInstalledApps(locationId: string, installedAppStatus?: string, smartAppToken?: string): rp.RequestPromise;
    getInstalledApp(installedAppId: string, smartAppToken?: string): rp.RequestPromise;
    deleteInstalledApp(installedAppId: string, locationId?: string, smartAppToken?: string): rp.RequestPromise;
    getInstalledAppConfig(installedAppId: string, configStatus?: string, smartAppToken?: string): rp.RequestPromise;
    getInstalledAppConfigEntries(installedAppId: string, configId: string, smartAppToken?: string): rp.RequestPromise;
    getAuthToken(token: string | undefined): string;
}
