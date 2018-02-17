"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestbuilder_1 = require("./requestbuilder");
class Locations {
    constructor(personalAccessToken) {
        this.personalAccessToken = personalAccessToken;
    }
    getLocations() {
        return requestbuilder_1.default(this.personalAccessToken, `locations`, 'GET');
    }
    createLocation(name, countryCode, latitude, longitude, regionRadius, temperatureScale, locale) {
        let body = {};
        body.name = name;
        body.countryCode = countryCode;
        if (name)
            body.name = name;
        if (latitude)
            body.latitude = latitude;
        if (longitude)
            body.longitude = longitude;
        if (regionRadius)
            body.regionRadius = regionRadius;
        if (temperatureScale)
            body.temperatureScale = temperatureScale;
        if (locale)
            body.locale = locale;
        return requestbuilder_1.default(this.personalAccessToken, 'locations', 'POST', body);
    }
    getLocationDetails(locationId, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        return requestbuilder_1.default(this.personalAccessToken, `locations/${locationId}`, 'GET');
    }
    updateLocation(locationId, name, latitude, longitude, regionRadius, temperatureScale, locale) {
        let body = {};
        if (name)
            body.name = name;
        if (latitude)
            body.latitude = latitude;
        if (longitude)
            body.longitude = longitude;
        if (regionRadius)
            body.regionRadius = regionRadius;
        if (temperatureScale)
            body.temperatureScale = temperatureScale;
        if (locale)
            body.locale = locale;
        console.log(body);
        return requestbuilder_1.default(this.personalAccessToken, `locations/${locationId}`, 'PUT', body);
    }
    deleteLocation(locationId) {
        return requestbuilder_1.default(this.personalAccessToken, `locations/${locationId}`, 'DELETE');
    }
    getAuthToken(token) {
        if (token) {
            return token;
        }
        return this.personalAccessToken;
    }
}
exports.default = Locations;
