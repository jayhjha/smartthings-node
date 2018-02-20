import * as bodyparser from 'body-parser';
import * as express from 'express';
import * as prettyjson from 'prettyjson';
import { SmartThings } from "smartthings-node";

import * as weatherControlledLightHandler from './weather-control-light';

let st = new SmartThings(String(process.env.ST_PROD_TOKEN));
let prettyjsonOptions = {};

const webhookUrl = "";
const uniqueAppName = ""

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.post('/', weatherControlledLightHandler.handle);

/**
 * Start Express Server and create the webhook app.
 * If app creation is successful, update the OAuth client with OAuth scopes.
 * Read more about app creation at: https://smartthings.developer.samsung.com/develop/guides/smartapps/app-registration.html#Register-via-SmartThings-API 
 */
var server = app.listen(3005, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log(`Server running at ${host}:${port}`);

  st.apps.createWebHookApp(uniqueAppName, 
                           'Weather Controlled Light App', 
                           'Control light color based on weatehr', 
                           webhookUrl)
  .then(appCreationResp => {
    console.log(prettyjson.render(appCreationResp, prettyjsonOptions));
    let appId = appCreationResp.app.appId;
    let oauthSettings = {clientName: 'Weather Controlled App OAuth Client', scope:["r:devices:*", "x:devices:*", "r:schedules", "w:schedules"]};
    return st.apps.updateAppOAuthSettings(appId, oauthSettings)
  })
  .then(oauthClientUpdateResp => {
    console.log(prettyjson.render(oauthClientUpdateResp, prettyjsonOptions));
  })
  .catch(appCreationError => {
    console.log(prettyjson.render(appCreationError, prettyjsonOptions));
  })
});
