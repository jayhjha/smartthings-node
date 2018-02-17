"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestbuilder_1 = require("./requestbuilder");
class DeviceComponent {
    constructor(id, capabilities) {
        this.id = id;
        this.capabilities = capabilities;
    }
}
exports.DeviceComponent = DeviceComponent;
class DeviceProfiles {
    constructor(personalAccessToken) {
        this.personalAccessToken = personalAccessToken;
    }
    listDeviceProfiles() {
        return requestbuilder_1.default(this.personalAccessToken, `deviceprofiles`, 'GET');
    }
    createDeviceProfile(name, components, metadata) {
        let body = {
            name: name,
            components: components,
            metadata: {}
        };
        if (metadata) {
            body.metadata = {};
        }
        return requestbuilder_1.default(this.personalAccessToken, `deviceprofiles`, 'POST', body);
    }
    getDeviceProfileDescription(deviceProfileId) {
        return requestbuilder_1.default(this.personalAccessToken, `deviceprofiles/${deviceProfileId}`, 'GET');
    }
    deleteDeviceProfile(deviceProfileId) {
        return requestbuilder_1.default(this.personalAccessToken, `deviceprofiles/${deviceProfileId}`, 'DELETE');
    }
}
exports.default = DeviceProfiles;
