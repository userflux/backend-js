// index.d.ts
declare module "@userflux/backend-js" {

    export interface UserFluxSDKOptions {
        defaultTrackingProperties?: Record<string, any>;
        locationEnrichEnabled?: boolean;
    }

    export interface TrackParameters {
        userId: string;
        event: string;
        properties?: Record<string, any>;
        locationEnrichEnabled?: boolean;
    }

    export interface IdentifyParameters {
        userId: string;
        properties: Record<string, any>;
    }

    class UserFlux {

        constructor(apiKey: string, options?: UserFluxSDKOptions);

        track(parameters: TrackParameters): Promise<void>;
        identify(parameters: IdentifyParameters): Promise<void>;

    }

    export = UserFlux;

}
