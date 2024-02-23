// index.d.ts
declare module "@userflux/backend-js" {

    class UserFlux {

        constructor(apiKey: string, options?: Record<string, any>);

        track(parameters: Record<string, any>): Promise<any>;
        identify(parameters: Record<string, any>): Promise<any>;

        static getUserIdFromCookie(cookieHeader: string): string | null;
        static getAnonymousIdFromCookie(cookieHeader: string): string | null;
        static getSessionIdFromCookie(cookieHeader: string): string | null;
        static isoTimestampToEpoch(isoTimestamp: string): number | null;

    }

    export = UserFlux;

}
