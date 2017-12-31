import * as request from 'request';
import * as rp from 'request-promise';

import config from './config';

const baseApiUrl = config.stApi.baseUrl;

class Devices {
  personalAccessToken: string;

  constructor(personalAccessToken: string) {
    this.personalAccessToken = personalAccessToken;
  }

  listApps(queryParams: {}) : rp.RequestPromise {
    return this.buildRequests('apps', 'GET', queryParams);
  }

  buildRequests(path: string, method: string, params: {}) : rp.RequestPromise {
    let url = `${baseApiUrl}${path}`;
    let options = {
      url: url,
      method: method,
      json: true,
      headers: {
        'Authorization': 'Bearer ' + this.personalAccessToken
      },
      qs: {},
      body: {}
    };

    if (params) {
      if (method === 'GET') {
        options.qs = params;
      } else if (method === 'POST') {
        options.body = params; 
      }
    }
    return rp(options);
  }
}

export default Devices;