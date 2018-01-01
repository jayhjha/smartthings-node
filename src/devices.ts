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

  listDevices(queryParams: {}) : rp.RequestPromise {
    return buildRequests(this.personalAccessToken, 'devices', 'GET', queryParams);
  }
}