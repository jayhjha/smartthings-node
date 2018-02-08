import * as rp from 'request-promise';
import buildRequest from './requestbuilder';

export class DeviceComponent {
  id: string;
  capabilities: Array<String>;

  constructor(id: string, capabilities: Array<string>) {
    this.id = id;
    this.capabilities = capabilities;
  }
}

export default class DeviceProfiles {
  authToken: string;

  constructor(authToken: string) {
    this.authToken = authToken;
  }

  listDeviceProfiles() : rp.RequestPromise{
    return buildRequest(this.authToken, `deviceprofiles`, 'GET');
  }

  createDeviceProfile(name: string, components: Array<DeviceComponent>, metadata?: {}) : rp.RequestPromise {
    let body = {
      name: name, 
      components: components,
      metadata: {}
    }
    if (metadata) {
      body.metadata = {};
    }
    return buildRequest(this.authToken, `deviceprofiles`, 'POST', body);
  }

  getDeviceProfileDescription(deviceProfileId: string): rp.RequestPromise {
    return buildRequest(this.authToken, `deviceprofiles/${deviceProfileId}`, 'GET');
  }

  deleteDeviceProfile(deviceProfileId: string) : rp.RequestPromise {
    return buildRequest(this.authToken, `deviceprofiles/${deviceProfileId}`, 'DELETE');
  }
}
