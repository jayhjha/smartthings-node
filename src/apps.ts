import * as rp from 'request-promise';
import buildRequest from './requestbuilder';

export default class Apps {
  authToken: string;

  constructor(authToken: string) {
    this.authToken = authToken;
  }

  createWebHookApp(appName: string,  displayName: string, description: string, 
                    targetUrl: string, singleInstance?: boolean) : rp.RequestPromise {
    let body = {
      appName: appName,
      displayName: displayName,
      description: description,
      singleInstance: singleInstance,
      appType: 'WEBHOOK_SMART_APP',
      targetUrl: targetUrl
    };
    return buildRequest(this.authToken, 'apps', 'POST', body);
  }

  createLambdaApp(appName: string,  displayName: string, description: string, 
                  functions: Array<String>, singleInstance?: boolean): rp.RequestPromise {
    let body = {
      appName: appName,
      displayName: displayName,
      description: description,
      singleInstance: singleInstance,
      appType: 'LAMBDA_SMART_APP',
      functions: functions
    };
    return buildRequest(this.authToken, 'apps', 'POST', body);
  }

  listApps(appType: string) : rp.RequestPromise {
    let queryParams = {appType: appType};
    return buildRequest(this.authToken, 'apps', 'GET', queryParams);
  }

  getAppDetails(appNameOrId: string) : rp.RequestPromise {
    return buildRequest(this.authToken, `apps/${appNameOrId}`, 'GET');
  }

  updateWebHookApp(appNameOrId: string, appName: string,  displayName: string, 
                   description: string, targetUrl: string, singleInstance?: boolean) : rp.RequestPromise {
    let body = {
      appName: appName,
      displayName: displayName,
      description: description,
      singleInstance: singleInstance,
      appType: 'WEBHOOK_SMART_APP',
      targetUrl: targetUrl
    };
    return buildRequest(this.authToken, `apps/${appNameOrId}`, 'PUT', body);
  }

  updateLambdaApp(appNameOrId: string, appName: string, displayName: string, 
                  description: string, functions: Array<String>, singleInstance?: boolean) : rp.RequestPromise {
    let body = {
      appName: appName,
      displayName: displayName,
      description: description,
      singleInstance: singleInstance,
      appType: 'LAMBDA_SMART_APP',
      functions: functions
    };
    return buildRequest(this.authToken, `apps/${appNameOrId}`, 'PUT', body);
  }

  deleteApp(appNameOrId: string) : rp.RequestPromise {
    return buildRequest(this.authToken, `apps/${appNameOrId}`, 'DELETE');
  }

  getAppSettings(appNameOrId: string) : rp.RequestPromise {
    return buildRequest(this.authToken, `apps/${appNameOrId}/settings`, 'GET');
  }

  updateAppSettings(appNameOrId: string, settings: {}) : rp.RequestPromise {
    let body = {settings: settings};
    return buildRequest(this.authToken, `apps/${appNameOrId}/settings`, 'PUT', body);
  }

  getAppOAuthSettings(appNameOrId: string) : rp.RequestPromise {
    return buildRequest(this.authToken, `apps/${appNameOrId}/oauth`, 'GET');
  }

  updateAppOAuthSettings(appNameOrId: string, body: {clientName: string, scope: Array<string>}) : rp.RequestPromise {
    return buildRequest(this.authToken, `apps/${appNameOrId}/oauth`, 'PUT', body);
  }

  generateAppOAuthClientSecret(appNameOrId: string, body: {client: string, scope: string}) : rp.RequestPromise {
    return buildRequest(this.authToken, `apps/${appNameOrId}/oauth/generate`, 'POST', body);
  }
}
