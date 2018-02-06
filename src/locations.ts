import * as rp from 'request-promise';
import buildRequest from './requestbuilder';
import { map } from 'bluebird';

export default class Locations {
  personalAccessToken: string;

  constructor(personalAccessToken: string) {
    this.personalAccessToken = personalAccessToken;
  }

  getLocations() {
    return buildRequest(this.personalAccessToken, `locations`, 'GET');
  }

  createLocation(name: string, countryCode: string, latitude?: number, longitude?: number,
                regionRadius?: number, temperatureScale?: string, locale?: string) {
                  
    let body: {[k:string] : any } = {};
    body.name = name;
    body.countryCode = countryCode;

    if (name) body.name = name;
    if (latitude) body.latitude = latitude;
    if (longitude) body.longitude = longitude;
    if (regionRadius) body.regionRadius = regionRadius;
    if (temperatureScale) body.temperatureScale = temperatureScale;
    if (locale) body.locale = locale;

    return buildRequest(this.personalAccessToken, 'locations', 'POST', body);
  }

  getLocationDetails(locationId: string) {
    return buildRequest(this.personalAccessToken, `locations/${locationId}`, 'GET');
  }

  updateLocation(locationId: string, name?: string, latitude?: number, longitude?: number,
                 regionRadius?: number, temperatureScale?: string, locale?: string) {
    
    let body: {[k:string] : any } = {};

    if (name) body.name = name;
    if (latitude) body.latitude = latitude;
    if (longitude) body.longitude = longitude;
    if (regionRadius) body.regionRadius = regionRadius;
    if (temperatureScale) body.temperatureScale = temperatureScale;
    if (locale) body.locale = locale;

    console.log(body);

    return buildRequest(this.personalAccessToken, `locations/${locationId}`, 'PUT', body);
  }

  deleteLocation(locationId: string) {
    return buildRequest(this.personalAccessToken, `locations/${locationId}`, 'DELETE');
  }
}