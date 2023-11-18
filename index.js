const axios = require('axios');

class UserFlux {

    constructor(apiKey, options = {}) {
        this.apiKey = apiKey;
        this.defaultTrackingProperties = options.defaultTrackingProperties || {};
        this.locationEnrichEnabled = options.autoEnrich || false;
    }

    isValidApiKeyProvided() {
        if (!this.apiKey || this.apiKey == 'null' || this.apiKey == '' || this.apiKey == 'undefined') {
            console.error('No API key provided');
            return false;
        }

        return true;
    }

    async sendRequest(endpoint, data, locEnrichEnabled) {
        if (!this.isValidApiKeyProvided()) {
            return;
        }

        try {
            const response = await axios.post(`https://integration-api.userflux.co/${endpoint}?locationEnrichment=${locEnrichEnabled}`, data, {
                headers: { 'Authorization': `Bearer ${this.apiKey}` }
            });
        } catch (error) {
            console.error(`Error in ${endpoint} request:`, error);
        }
    }

    async track(parameters) {
        if (!parameters || typeof parameters !== 'object') {
            console.error('Invalid parameters passed to track method');
            return;
        }

        // sanity check event
        const event = parameters.event;
        if (!event || typeof event !== 'string' || event == 'null' || event == '' || event == 'undefined') {
            console.error('Invalid event passed to track method');
            return;
        }

        // sanity check userId
        const userId = parameters.userId;
        if (userId && (typeof userId !== 'string' || userId == 'null' || userId == '' || userId == 'undefined')) {
            console.error('Invalid userId passed to track method');
            return;
        }

        // santify check anonymousId
        const anonymousId = parameters.anonymousId;
        if (anonymousId && (typeof anonymousId !== 'string' || anonymousId == 'null' || anonymousId == '' || anonymousId == 'undefined')) {
            console.error('Invalid anonymousId passed to track method');
            return;
        }

        // ensure either userId or anonymousId is provided
        if (!userId && !anonymousId) {
            console.error('Either userId or anonymousId must be provided');
            return;
        }

        // sanity check properties
        const properties = parameters.properties || {};
        if (typeof properties !== 'object') {
            console.error('Invalid properties passed to track method');
            return;
        }

        // combine event properties with any default tracking properties
        const finalProperties = {
            ...this.defaultTrackingProperties,
            ...properties
        };

        const payload = {
            timestamp: Date.now(),
            userId: userId,
            anonymousId: anonymousId,
            name: event,
            properties: finalProperties,
            deviceData: null
        };

        const finalLocationEnrichEnabled = parameters.locationEnrichEnabled || this.locationEnrichEnabled;

        await this.sendRequest('event/ingest', payload, finalLocationEnrichEnabled);
    }

    async identify(parameters) {
        if (!parameters || typeof parameters !== 'object') {
            console.error('Invalid parameters passed to identify method');
            return;
        }

        // sanity check userId
        const userId = parameters.userId;
        if (userId && (typeof userId !== 'string' || userId == 'null' || userId == '' || userId == 'undefined')) {
            console.error('Invalid userId passed to identify method');
            return;
        }

        // santify check anonymousId
        const anonymousId = parameters.anonymousId;
        if (anonymousId && (typeof anonymousId !== 'string' || anonymousId == 'null' || anonymousId == '' || anonymousId == 'undefined')) {
            console.error('Invalid anonymousId passed to identify method');
            return;
        }

        // ensure either userId or anonymousId is provided
        if (!userId && !anonymousId) {
            console.error('Either userId or anonymousId must be provided');
            return;
        }

        // sanity check properties
        const properties = parameters.properties;
        if (!properties || typeof properties !== 'object') {
            console.error('Invalid properties passed to identify method');
            return;
        }

        const payload = {
            userId: userId,
            anonymousId: anonymousId,
            properties: properties,
            deviceData: null
        };

        const finalLocationEnrichEnabled = parameters.locationEnrichEnabled || this.locationEnrichEnabled;

        await this.sendRequest('profile', payload, finalLocationEnrichEnabled);
    }

}

module.exports = UserFlux;
