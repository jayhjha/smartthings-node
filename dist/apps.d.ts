/// <reference types="request-promise" />
import * as rp from 'request-promise';
export default class Apps {
    personalAccessToken: string;
    constructor(personalAccessToken: string);
    createWebHookApp(appName: string, displayName: string, description: string, targetUrl: string, singleInstance?: boolean, smartAppToken?: string): rp.RequestPromise;
    createLambdaApp(appName: string, displayName: string, description: string, functions: Array<String>, singleInstance?: boolean, smartAppToken?: string): rp.RequestPromise;
    listApps(appType?: string, smartAppToken?: string): rp.RequestPromise;
    getAppDetails(appNameOrId: string): rp.RequestPromise;
    updateWebHookApp(appNameOrId: string, appName: string, displayName: string, description: string, targetUrl: string, singleInstance?: boolean, smartAppToken?: string): rp.RequestPromise;
    updateLambdaApp(appNameOrId: string, appName: string, displayName: string, description: string, functions: Array<String>, singleInstance?: boolean, smartAppToken?: string): rp.RequestPromise;
    deleteApp(appNameOrId: string, smartAppToken?: string): rp.RequestPromise;
    getAppSettings(appNameOrId: string): rp.RequestPromise;
    updateAppSettings(appNameOrId: string, settings: {}, smartAppToken?: string): rp.RequestPromise;
    getAppOAuthSettings(appNameOrId: string): rp.RequestPromise;
    updateAppOAuthSettings(appNameOrId: string, body: {
        clientName: string;
        scope: Array<string>;
    }, smartAppToken?: string): rp.RequestPromise;
    generateAppOAuthClientSecret(appNameOrId: string, body: {
        client: string;
        scope: string;
    }, smartAppToken?: string): rp.RequestPromise;
    getAuthToken(token: string | undefined): string;
}
