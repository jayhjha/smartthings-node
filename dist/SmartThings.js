"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apps_1 = require("./apps");
const devices_1 = require("./devices");
const deviceprofiles_1 = require("./deviceprofiles");
const installedapps_1 = require("./installedapps");
const locations_1 = require("./locations");
const subscriptions_1 = require("./subscriptions");
const schedules_1 = require("./schedules");
class SmartThings {
    constructor(personalAccessToken) {
        this.personalAccessToken = personalAccessToken;
        this.apps = new apps_1.default(this.personalAccessToken);
        this.deviceProfiles = new deviceprofiles_1.default(this.personalAccessToken);
        this.devices = new devices_1.default(this.personalAccessToken);
        this.installedApps = new installedapps_1.default(this.personalAccessToken);
        this.locations = new locations_1.default(this.personalAccessToken);
        this.subscriptions = new subscriptions_1.default(this.personalAccessToken);
        this.schedules = new schedules_1.default(this.personalAccessToken);
    }
}
exports.SmartThings = SmartThings;
