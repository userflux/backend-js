// index.d.ts
declare module "@userflux/backend-js" {

    class UserFlux {

        constructor(apiKey: string, options?: Record<string, any>);

        track(parameters: Record<string, any>): Promise<void>;
        identify(parameters: Record<string, any>): Promise<void>;

        static getUserIdFromCookie(cookieHeader: string): string | null;
        static getAnonymousIdFromCookie(cookieHeader: string): string | null;

    }

    export = UserFlux;

}
