# smartthings-node
Node.js Client for Samsung SmartThings API

```js
//ES6
import { SmartThings } from "smartthings-node";
let st = new SmartThings("PERSONAL_ACCESS_TOKEN"));

//CommonJS
const smartthings = require("smartthings-node");
let st = new smartthings("PERSONAL_ACCESS_TOKEN");
```

## Installation
This module is available through npm and requires version > 7.x

```bash
$ npm install smartthings-node
```

## Quick Start
Install the smartthings-node module
```bash
$ npm install smartthings-node
```

Import the module

If you are using Typescript or ES6 with it's import syntax:

```js
import { SmartThings } from "smartthings-node";
let st = new SmartThings("PERSONAL_ACCESS_TOKEN"));
```

If you are using the CommonJS syntax:
```js
const smartthings = require("smartthings-node");
let st = new smartthings("PERSONAL_ACCESS_TOKEN");
```

Use a sub-module. For example, to get a list of devices with switch capability:
```js
st.devices.listDevicesByCapbility('switch')
.then(deviceList => {
  console.log(deviceList);
})
```

## Example
An example on how to create Automation SmartApp to control a light bulb using based on current weather can be found at:
https://github.com/hijha/smartthings-node/tree/master/examples/weather-controlled-light