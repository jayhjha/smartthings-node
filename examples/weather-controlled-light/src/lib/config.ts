/** 
 * Create Configuration Intialization settings - appName, descriptions and permissions
*/
let createConfigInitializeSetting = () => {
  return {
    name: 'Weather Controlled Bulb',
    description: 'Bulb color by current temperature',
    id: 'app',
    permissions:['r:schedules','w:schedules'],
    firstPageId: '1'
  }
}

/**
 * Create page for app configuration : name of city, deviceId
 * @param pageId 
 * @param currentConfig 
 */
let createConfigPage = (pageId: string, currentConfig: string) => {
  if (pageId !== '1') {
    throw new Error(`Unsupported page name: ${pageId}`);
  }

  return {
    pageId: '1',
    name: 'Weather Controlled Bulb',
    nextPageId: null,
    previousPageId: null,
    complete: true,
    sections: [
      {
        name: 'Name of city',
        settings: [
          {
            id: 'cityName',
            name: 'What North American city?',
            description: 'Enter City Name',
            type: 'TEXT',
            required: true
          },
        ]
      },
      {
        name: 'Set the color of this light',
        settings: [
          {
            id: 'colorLight',
            name: 'Which color light?',
            description: 'Tap to set',
            type: 'DEVICE',
            required: true,
            multiple: false,
            capabilities: ['colorControl', 'switch', 'switchLevel'],
            permissions: ['r', 'x']
          }
        ]
      }
    ]
  };
}

/**
 * Handle request for Configruation Lifecycle
 * @param event 
 */
export let handle = (event: any) => {
    if (!event.config) {
      throw new Error('No config section set in request.');
    }
    let config: {initialize: any, page: any} = {initialize: null, page: null}
    const phase : string = event.phase;
    const pageId : string = event.pageId;
    const settings = event.config;
    switch (phase) {
      case 'INITIALIZE':
        config.initialize = createConfigInitializeSetting();
        break;
      case 'PAGE':
        config.page = createConfigPage(pageId, settings);
        break;
      default:
        throw new Error(`Unsupported config phase: ${phase}`);
    }
    return config;
  }
