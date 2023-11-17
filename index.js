const axios = require('axios');

class UserFlux {

    constructor(apiKey, options = {}) {
        this.apiKey = apiKey;
        this.defaultTrackingProperties = options.defaultTrackingProperties || {};
        this.locationEnrichEnabled = options.autoEnrich || false;
    }

    async sendRequest(endpoint, data, locEnrichEnabled) {
        try {
            const response = await axios.post(`https://integration-api.userflux.co/${endpoint}?locationEnrichment=${locEnrichEnabled}`, data, {
                headers: { 'Authorization': `Bearer ${this.apiKey}` }
            });
            console.log(`${endpoint} request successful:`, response.data);
        } catch (error) {
            console.error(`Error in ${endpoint} request:`, error);
        }
    }

    async track(parameters) {
        // need to check if `parameters` is an object and contains `userId` and `event` properties
        if (!parameters || typeof parameters !== 'object' || !parameters.userId || !parameters.event) {
            console.error('Invalid parameters passed to track method');
            return;
        }
        
        // sanity check userId
        const userId = parameters.userId;
        if (typeof userId !== 'string' || userId == 'null' || userId == '' || userId == 'undefined') {
            console.error('Invalid userId passed to track method');
            return;
        }

        // sanity check event
        if (typeof parameters.event !== 'string' || parameters.event == 'null' || parameters.event == '' || parameters.event == 'undefined') {
            console.error('Invalid event passed to track method');
            return;
        }

        const event = parameters.event;
        const properties = parameters.properties || {};

        // combine event properties with any default tracking properties
        const finalProperties = {
            ...this.defaultTrackingProperties,
            ...properties
        };

        const payload = {
            timestamp: Date.now(),
            userId: userId,
            anonymousId: null,
            name: event,
            properties: finalProperties,
            deviceData: null
        };

        const finalLocationEnrichEnabled = parameters.locationEnrichEnabled || this.locationEnrichEnabled;

        await this.sendRequest('event/ingest', payload, finalLocationEnrichEnabled);
    }

    async identify(parameters) {
        // need to check if `parameters` is an object and contains `userId` and `properties` properties
        if (!parameters || typeof parameters !== 'object' || !parameters.userId || !parameters.properties) {
            console.error('Invalid parameters passed to identify method');
            return;
        }

        // sanity check userId
        const userId = parameters.userId;
        if (typeof userId !== 'string' || userId == 'null' || userId == '' || userId == 'undefined') {
            console.error('Invalid userId passed to track method');
            return;
        }

        // sanity check properties
        const properties = parameters.properties;
        if (typeof properties !== 'object') {
            console.error('Invalid properties passed to identify method');
            return;
        }

        const payload = {
            userId: userId,
            anonymousId: null,
            properties: properties,
            deviceData: null
        };

        const finalLocationEnrichEnabled = parameters.locationEnrichEnabled || this.locationEnrichEnabled;

        await this.sendRequest('profile', payload, finalLocationEnrichEnabled);
    }

}
