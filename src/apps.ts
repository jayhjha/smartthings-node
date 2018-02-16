import * as rp from 'request-promise';
import buildRequest from './requestbuilder';

export default class Apps {
  personalAccessToken: string;

  constructor(personalAccessToken: string) {
    this.personalAccessToken = personalAccessToken;
  }

  createWebHookApp(appName: string,  displayName: string, description: string, 
                   targetUrl: string, singleInstance?: boolean, smartAppToken?: string) : rp.RequestPromise {
    let authToken = this.getAuthToken(smartAppToken);
    let body = {
      appName: appName,
      displayName: displayName,
      description: description,
      singleInstance: singleInstance,
      appType: 'WEBHOOK_SMART_APP',
      webhookSmartApp: {
        targetUrl: targetUrl
      }      
    };
    return buildRequest(authToken, 'apps', 'POST', body);
  }

  createLambdaApp(appName: string,  displayName: string, description: string, 
                  functions: Array<String>, singleInstance?: boolean, smartAppToken?: string) : rp.RequestPromise {
      let authToken = this.getAuthToken(smartAppToken);
      let body = {
      appName: appName,
      displayName: displayName,
      description: description,
      singleInstance: singleInstance,
      appType: 'LAMBDA_SMART_APP',
      lambdaSmartApp: {
        functions: functions
      }
    };
    return buildRequest(authToken, 'apps', 'POST', body);
  }

  listApps(appType?: string, smartAppToken?: string) : rp.RequestPromise {
    let authToken = this.getAuthToken(smartAppToken);
    let queryParams = {};
    if (appType) {
      queryParams = {appType: appType};
    }
    return buildRequest(authToken, 'apps', 'GET', queryParams);
  }

  getAppDetails(appNameOrId: string) : rp.RequestPromise {
    return buildRequest(this.personalAccessToken, `apps/${appNameOrId}`, 'GET');
  }

  updateWebHookApp(appNameOrId: string, appName: string,  displayName: string, description: string, 
                   targetUrl: string, singleInstance?: boolean, smartAppToken?: string) : rp.RequestPromise {
    let authToken = this.getAuthToken(smartAppToken);
    let body = {
      appName: appName,
      displayName: displayName,
      description: description,
      singleInstance: singleInstance,
      appType: 'WEBHOOK_SMART_APP',
      webhookSmartApp: {
        targetUrl: targetUrl
      }
    };
    return buildRequest(authToken, `apps/${appNameOrId}`, 'PUT', body);
  }

  updateLambdaApp(appNameOrId: string, appName: string, displayName: string, description: string, 
                  functions: Array<String>, singleInstance?: boolean, smartAppToken?: string) : rp.RequestPromise {
    let authToken = this.getAuthToken(smartAppToken);
    let body = {
      appName: appName,
      displayName: displayName,
      description: description,
      singleInstance: singleInstance,
      appType: 'LAMBDA_SMART_APP',
      lambdaSmartApp: {
        functions: functions
      }
    };
    return buildRequest(authToken, `apps/${appNameOrId}`, 'PUT', body);
  }

  deleteApp(appNameOrId: string, smartAppToken?: string) : rp.RequestPromise {
    let authToken = this.getAuthToken(smartAppToken);
    return buildRequest(authToken, `apps/${appNameOrId}`, 'DELETE');
  }

  getAppSettings(appNameOrId: string) : rp.RequestPromise {
    return buildRequest(this.personalAccessToken, `apps/${appNameOrId}/settings`, 'GET');
  }

  updateAppSettings(appNameOrId: string, settings: {}, smartAppToken?: string) : rp.RequestPromise {
    let authToken = this.getAuthToken(smartAppToken);
    let body = {settings: settings};
    return buildRequest(authToken, `apps/${appNameOrId}/settings`, 'PUT', body);
  }

  getAppOAuthSettings(appNameOrId: string) : rp.RequestPromise {
    return buildRequest(this.personalAccessToken, `apps/${appNameOrId}/oauth`, 'GET');
  }

  updateAppOAuthSettings(appNameOrId: string, body: {clientName: string, scope: Array<string>},
                         smartAppToken?: string) : rp.RequestPromise {
    let authToken = this.getAuthToken(smartAppToken);
    return buildRequest(authToken, `apps/${appNameOrId}/oauth`, 'PUT', body);
  }

  generateAppOAuthClientSecret(appNameOrId: string, body: {client: string, scope: string}, 
                               smartAppToken?: string) : rp.RequestPromise {
    let authToken = this.getAuthToken(smartAppToken);
    return buildRequest(authToken, `apps/${appNameOrId}/oauth/generate`, 'POST', body);
  }

  getAuthToken(token: string | undefined) : string {
    if (token) {
      return token;
    }
    return this.personalAccessToken;
  }
}
