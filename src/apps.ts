import * as rp from 'request-promise';
import buildRequest from './requestbuilder';

export default class Apps {
  personalAccessToken: string;

  constructor(personalAccessToken: string) {
    this.personalAccessToken = personalAccessToken;
  }

  createWebHookApp(appName: string,  displayName: string, description: string, targetUrl: string, singleInstance?: boolean): rp.RequestPromise {
    let body = {
      appName: appName,
      displayName: displayName,
      description: description,
      singleInstance: singleInstance,
      appType: 'WEBHOOK_SMART_APP',
      targetUrl: targetUrl
    };
    return buildRequest(this.personalAccessToken, 'apps', 'POST', body);
  }

  createLambdaApp(appName: string,  displayName: string, description: string, functions: Array<String>, singleInstance?: boolean): rp.RequestPromise{
    let body = {
      appName: appName,
      displayName: displayName,
      description: description,
      singleInstance: singleInstance,
      appType: 'LAMBDA_SMART_APP',
      functions: functions
    };
    return buildRequest(this.personalAccessToken, 'apps', 'POST', body);
  }

  listApps(appType: string) : rp.RequestPromise {
    let queryParams = {appType: appType};
    return buildRequest(this.personalAccessToken, 'apps', 'GET', queryParams);
  }

  getAppDetails(appNameOrId: string): rp.RequestPromise {
    return buildRequest(this.personalAccessToken, `apps/${appNameOrId}`, 'GET');
  }

  updateWebHookApp(appNameOrId: string, appName: string,  displayName: string, description: string,
                   targetUrl: string, singleInstance?: boolean): rp.RequestPromise {
    let body = {
      appName: appName,
      displayName: displayName,
      description: description,
      singleInstance: singleInstance,
      appType: 'WEBHOOK_SMART_APP',
      targetUrl: targetUrl
    };
    return buildRequest(this.personalAccessToken, `apps/${appNameOrId}`, 'PUT', body);
  }

  updateLambdaApp(appNameOrId: string, appName: string, displayName: string, description: string, functions: Array<String>, singleInstance?: boolean): rp.RequestPromise{
    let body = {
      appName: appName,
      displayName: displayName,
      description: description,
      singleInstance: singleInstance,
      appType: 'LAMBDA_SMART_APP',
      functions: functions
    };
    return buildRequest(this.personalAccessToken, `apps/${appNameOrId}`, 'PUT', body);
  }

  deleteApp(appNameOrId: string): rp.RequestPromise {
    return buildRequest(this.personalAccessToken, `apps/${appNameOrId}`, 'DELETE');
  }

  getAppSettings(appNameOrId: string): rp.RequestPromise {
    return buildRequest(this.personalAccessToken, `apps/${appNameOrId}/settings`, 'GET');
  }

  updateAppSettings(appNameOrId: string, settings: {}): rp.RequestPromise {
    let body = {settings: settings};
    return buildRequest(this.personalAccessToken, `apps/${appNameOrId}/settings`, 'PUT', body);
  }

  getAppOAuthSettings(appNameOrId: string) {
    return buildRequest(this.personalAccessToken, `apps/${appNameOrId}/oauth`, 'GET');
  }

  updateAppOAuthSettings(appNameOrId: string, body: {clientName: string, scope: Array<string>}): rp.RequestPromise {
    return buildRequest(this.personalAccessToken, `apps/${appNameOrId}/oauth`, 'PUT', body);
  }

  generateAppOAuthClientSecret(appNameOrId: string, body: {client: string, scope: string}): rp.RequestPromise {
    return buildRequest(this.personalAccessToken, `apps/${appNameOrId}/oauth/generate`, 'POST', body);
  }
}
