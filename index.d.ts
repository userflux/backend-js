// index.d.ts
declare module "@userflux/backend-js" {

    export interface UserFluxSDKOptions {
        defaultTrackingProperties?: Record<string, any>;
        autoEnrich?: boolean;
    }

    export interface TrackParameters {
        userId?: string;
        anonymousId?: string;
        event: string;
        properties?: Record<string, any>;
        locationEnrichEnabled?: boolean;
    }

    export interface IdentifyParameters {
        userId?: string;
        anonymousId?: string;
        properties: Record<string, any>;
    }

    export class UserFlux {

        constructor(apiKey: string, options?: UserFluxSDKOptions);

        track(parameters: TrackParameters): Promise<void>;
        identify(parameters: IdentifyParameters): Promise<void>;

        static getUserIdFromCookie(cookieHeader: string): string | null;
        static getAnonymousIdFromCookie(cookieHeader: string): string | null;

    }

}
