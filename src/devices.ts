import * as rp from 'request-promise';
import buildRequest from './requestbuilder';

export default class Devices {
  personalAccessToken: string;

  constructor(personalAccessToken: string) {
    this.personalAccessToken = personalAccessToken;
  }

  listDevicesByLocation(locationId: string): rp.RequestPromise {
    let queryParams = {locationId: locationId};
    return this.listDevices(queryParams);
  }

  listDevicesByCapability(capability: string): rp.RequestPromise {
    let queryParams = {capability: capability};
    return this.listDevices(queryParams);
  }

  listDevicesByDeviceId(deviceId: string): rp.RequestPromise {
    let queryParams = {deviceId: deviceId};
    return this.listDevices(queryParams);
  }

  listDevices(queryParams: {locationId?: string, capability?: string, deviceId?: string}, smartAppToken?: string) : rp.RequestPromise {
    let authToken = this.getAuthToken(smartAppToken);
    return buildRequest(authToken, 'devices', 'GET', queryParams);
  }

  installDevice(smartAppToken: string, body: {label?: string, locationId: string, app: {profileId: string, 
                installedAppId: string, externalId?: string}}) {
    return buildRequest(smartAppToken, 'devices', 'POST', body);
  }

  getDeviceDescription(deviceId: string, smartAppToken?: string): rp.RequestPromise {
    let authToken = this.getAuthToken(smartAppToken);
    return buildRequest(authToken, `devices/${deviceId}`, 'GET');
  }

  deleteDevice(deviceId: string, smartAppToken?: string): rp.RequestPromise {
    let authToken = this.getAuthToken(smartAppToken);
    return buildRequest(authToken, `devices/${deviceId}`, 'DELETE');
  }

  updateDevice(deviceId: string, label: string, smartAppToken?: string): rp.RequestPromise {
    let authToken = this.getAuthToken(smartAppToken);
    let body = {label: label};
    return buildRequest(authToken, `devices/${deviceId}`, 'PUT', body);
  }

  executeDeviceCommand(deviceId: string, commands: Array<{}>, smartAppToken?: string): rp.RequestPromise {
    let authToken = this.getAuthToken(smartAppToken);
    return buildRequest(authToken, `devices/${deviceId}/commands`, 'POST', commands);
  }

  //TODO:: Not working. Figure out how device events work
  createDeviceEvents(deviceId: string, deviceEvents: Array<{}>, smartAppToken?: string): rp.RequestPromise {
    let authToken = this.getAuthToken(smartAppToken);
    return buildRequest(authToken, `devices/${deviceId}/events`, 'POST', deviceEvents);
  }

  getDeviceStatus(deviceId: string, smartAppToken?: string): rp.RequestPromise {
    let authToken = this.getAuthToken(smartAppToken);
    return buildRequest(authToken, `devices/${deviceId}/status`, 'GET');
  }

  getDeviceComponentStatus(deviceId: string, componentId: string, smartAppToken?: string) : rp.RequestPromise {
    let authToken = this.getAuthToken(smartAppToken);
    return buildRequest(authToken, `devices/${deviceId}/components/${componentId}/status`, 'GET');
  }

  getDeviceCapabilityStatus(deviceId: string, componentId: string, capability: string, smartAppToken?: string): rp.RequestPromise {
    let authToken = this.getAuthToken(smartAppToken);
    return buildRequest(authToken,
      `devices/${deviceId}/components/${componentId}/capabilities/${capability}/status`, 'GET');
  }

  getAuthToken(token: string | undefined) : string {
    if (token) {
      return token;
    }
    return this.personalAccessToken;
  }
}
