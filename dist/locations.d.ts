/// <reference types="request-promise" />
import * as rp from 'request-promise';
export default class Locations {
    personalAccessToken: string;
    constructor(personalAccessToken: string);
    getLocations(): rp.RequestPromise;
    createLocation(name: string, countryCode: string, latitude?: number, longitude?: number, regionRadius?: number, temperatureScale?: string, locale?: string): rp.RequestPromise;
    getLocationDetails(locationId: string, smartAppToken?: string): rp.RequestPromise;
    updateLocation(locationId: string, name?: string, latitude?: number, longitude?: number, regionRadius?: number, temperatureScale?: string, locale?: string): rp.RequestPromise;
    deleteLocation(locationId: string): rp.RequestPromise;
    getAuthToken(token: string | undefined): string;
}
