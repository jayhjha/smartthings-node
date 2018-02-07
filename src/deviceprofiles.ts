import * as rp from 'request-promise';
import buildRequest from './requestbuilder';

export class DeviceComponent {
  id: string
  capabilities: Array<String>
}

export default class DeviceProfiles {
  personalAccessToken: string;

  constructor(personalAccessToken: string) {
    this.personalAccessToken = personalAccessToken;
  }

  listDeviceProfiles() : rp.RequestPromise{
    return buildRequest(this.personalAccessToken, `deviceprofiles`, 'GET');
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
    return buildRequest(this.personalAccessToken, `deviceprofiles`, 'POST', body);
  }

  getDeviceProfileDescription(deviceProfileId: string): rp.RequestPromise {
    return buildRequest(this.personalAccessToken, `deviceprofiles/${deviceProfileId}`, 'GET');
  }

  deleteDeviceProfile(deviceProfileId: string) : rp.RequestPromise {
    return buildRequest(this.personalAccessToken, `deviceprofiles/${deviceProfileId}`, 'DELETE');
  }
}