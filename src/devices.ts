import * as rp from 'request-promise';
import buildRequests from './requestbuilder';

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

  listDevices(queryParams: {locationId?: string, capability?: string, deviceId?: string}) : rp.RequestPromise {
    return buildRequests(this.personalAccessToken, 'devices', 'GET', queryParams);
  }

  getDeviceDescription(deviceId: string): rp.RequestPromise {
    return buildRequests(this.personalAccessToken, `devices/${deviceId}`, 'GET');
  }

  getDeviceStatus(deviceId: string): rp.RequestPromise {
    return buildRequests(this.personalAccessToken, `devices/${deviceId}/status`, 'GET');
  }

  getDeviceComponentStatus(deviceId: string, componentId: string): rp.RequestPromise {
    return buildRequests(this.personalAccessToken, `devices/${deviceId}/components/${componentId}/status`, 'GET');
  }

  getDeviceCapabilityStatus(deviceId: string, componentId: string, capability: string): rp.RequestPromise {
    return buildRequests(this.personalAccessToken,
      `devices/${deviceId}/components/${componentId}/capabilities/${capability}/status`, 'GET');
  }

  deleteDevice(deviceId: string): rp.RequestPromise {
    return buildRequests(this.personalAccessToken, `devices/${deviceId}`, 'DELETE');
  }

  updateDevice(deviceId: string, label: string): rp.RequestPromise {
    let body = {label: label};
    return buildRequests(this.personalAccessToken, `devices/${deviceId}`, 'PUT', body);
  }

  executeDeviceCommand(deviceId: string, commands: Array<{}>): rp.RequestPromise {
    return buildRequests(this.personalAccessToken, `devices/${deviceId}/commands`, 'POST', commands);
  }
}
