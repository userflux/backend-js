const axios = require('axios');

class UserFlux {

    constructor(apiKey, options = {}) {
        this.apiKey = apiKey;
        this.defaultTrackingProperties = options.defaultTrackingProperties || {};
    }

    async sendRequest(endpoint, data) {
        try {
            const response = await axios.post(`https://integration-api.userflux.co/${endpoint}`, data, {
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
        
        const userId = parameters.userId;
        if (userId == 'null' || userId == '' || userId == 'undefined') {
            console.error('Invalid userId passed to track method');
            return;
        }

        const event = parameters.event;
        const properties = parameters.properties || {};

        // combine event properties with any default tracking properties
        const finalProperties = {
            ...this.defaultTrackingProperties,
            ...properties,
        };

        const payload = {
            timestamp: Date.now(),
            userId: userId,
            anonymousId: null,
            name: event,
            properties: finalProperties,
            deviceData: null
        };

        await this.sendRequest('event/ingest', payload);
    }

}
