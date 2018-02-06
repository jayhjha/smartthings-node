import * as rp from 'request-promise';
import config from './config';

const baseApiUrl = config.stApi.baseUrl;

export default function buildRequest(token: string, path: string, method: string, params?: {}) : rp.RequestPromise {
  let url = `${baseApiUrl}${path}`;
  let options = {
    url: url,
    method: method,
    json: true,
    headers: {
      'Authorization': 'Bearer ' + token
    },
    qs: {},
    body: {}
  };

  if (params) {
    if (method === 'GET' || method === 'DELETE') {
      options.qs = params;
    } else if (method === 'POST') {
      options.body = params; 
    }
  }
  return rp(options);
}