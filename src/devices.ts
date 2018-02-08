import * as rp from 'request-promise';
import buildRequest from './requestbuilder';

export default class Devices {
  authToken: string;

  constructor(authToken: string) {
    this.authToken = authToken;
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

  listDevices(queryParams: {locationId?: string, capability?: string, deviceId?: string}) : rp.RequestPromise {
    return buildRequest(this.authToken, 'devices', 'GET', queryParams);
  }

  installDevice(smartAppToken: string, body: {label?: string, locationId: string, app: {profileId: string, 
                installedAppId: string, externalId?: string}}) {
    return buildRequest(smartAppToken, 'devices', 'POST', body);
  }

  getDeviceDescription(deviceId: string): rp.RequestPromise {
    return buildRequest(this.authToken, `devices/${deviceId}`, 'GET');
  }

  deleteDevice(deviceId: string): rp.RequestPromise {
    return buildRequest(this.authToken, `devices/${deviceId}`, 'DELETE');
  }

  updateDevice(deviceId: string, label: string): rp.RequestPromise {
    let body = {label: label};
    return buildRequest(this.authToken, `devices/${deviceId}`, 'PUT', body);
  }

  executeDeviceCommand(deviceId: string, commands: Array<{}>): rp.RequestPromise {
    return buildRequest(this.authToken, `devices/${deviceId}/commands`, 'POST', commands);
  }

  //TODO:: Not working. Figure out how device events work
  createDeviceEvents(deviceId: string, deviceEvents: Array<{}>): rp.RequestPromise {
    return buildRequest(this.authToken, `devices/${deviceId}/events`, 'POST', deviceEvents);
  }

  getDeviceStatus(deviceId: string): rp.RequestPromise {
    return buildRequest(this.authToken, `devices/${deviceId}/status`, 'GET');
  }

  getDeviceComponentStatus(deviceId: string, componentId: string): rp.RequestPromise {
    return buildRequest(this.authToken, `devices/${deviceId}/components/${componentId}/status`, 'GET');
  }

  getDeviceCapabilityStatus(deviceId: string, componentId: string, capability: string): rp.RequestPromise {
    return buildRequest(this.authToken,
      `devices/${deviceId}/components/${componentId}/capabilities/${capability}/status`, 'GET');
  }
}
