"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestbuilder_1 = require("./requestbuilder");
class Devices {
    constructor(personalAccessToken) {
        this.personalAccessToken = personalAccessToken;
    }
    listDevicesByLocation(locationId) {
        let queryParams = { locationId: locationId };
        return this.listDevices(queryParams);
    }
    listDevicesByCapability(capability) {
        let queryParams = { capability: capability };
        return this.listDevices(queryParams);
    }
    listDevicesByDeviceId(deviceId) {
        let queryParams = { deviceId: deviceId };
        return this.listDevices(queryParams);
    }
    listDevices(queryParams, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        return requestbuilder_1.default(authToken, 'devices', 'GET', queryParams);
    }
    installDevice(smartAppToken, body) {
        return requestbuilder_1.default(smartAppToken, 'devices', 'POST', body);
    }
    getDeviceDescription(deviceId, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        return requestbuilder_1.default(authToken, `devices/${deviceId}`, 'GET');
    }
    deleteDevice(deviceId, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        return requestbuilder_1.default(authToken, `devices/${deviceId}`, 'DELETE');
    }
    updateDevice(deviceId, label, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        let body = { label: label };
        return requestbuilder_1.default(authToken, `devices/${deviceId}`, 'PUT', body);
    }
    executeDeviceCommand(deviceId, commands, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        return requestbuilder_1.default(authToken, `devices/${deviceId}/commands`, 'POST', commands);
    }
    //TODO:: Not working. Figure out how device events work
    createDeviceEvents(deviceId, deviceEvents, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        return requestbuilder_1.default(authToken, `devices/${deviceId}/events`, 'POST', deviceEvents);
    }
    getDeviceStatus(deviceId, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        return requestbuilder_1.default(authToken, `devices/${deviceId}/status`, 'GET');
    }
    getDeviceComponentStatus(deviceId, componentId, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        return requestbuilder_1.default(authToken, `devices/${deviceId}/components/${componentId}/status`, 'GET');
    }
    getDeviceCapabilityStatus(deviceId, componentId, capability, smartAppToken) {
        let authToken = this.getAuthToken(smartAppToken);
        return requestbuilder_1.default(authToken, `devices/${deviceId}/components/${componentId}/capabilities/${capability}/status`, 'GET');
    }
    getAuthToken(token) {
        if (token) {
            return token;
        }
        return this.personalAccessToken;
    }
}
exports.default = Devices;
