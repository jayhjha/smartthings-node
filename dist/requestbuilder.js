"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rp = require("request-promise");
const prettyjson = require("prettyjson");
const config_1 = require("./config");
const baseApiUrl = config_1.default.stApi.baseUrl;
let prettyjsonOptions = {};
function buildRequest(token, path, method, params) {
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
        }
        else if (method === 'POST' || method === 'PUT') {
            options.body = params;
        }
    }
    console.log('Request::');
    console.log(prettyjson.render(options, prettyjsonOptions));
    console.log('\n');
    return rp(options);
}
exports.default = buildRequest;
