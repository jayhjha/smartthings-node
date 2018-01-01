import * as rp from 'request-promise';
import buildRequests from './requestbuilder';

export default class Apps {
  personalAccessToken: string;

  constructor(personalAccessToken: string) {
    this.personalAccessToken = personalAccessToken;
  }

  listApps(queryParams: {}) : rp.RequestPromise {
    return buildRequests(this.personalAccessToken, 'apps', 'GET', queryParams);
  }
}