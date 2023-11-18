# @userflux/backend-js
UserFlux's Backend JavaScript SDK - send your analytics data to the UserFlux platform.

# Getting Started

## 1. Install the package

```bash
npm i @userflux/backend-js
```

## 2. Initialise the SDK

```javascript
import UserFlux from '@userflux/backend-js';
// or
const UserFlux = require('@userflux/backend-js');

const ufClient = new UserFlux('<YOUR_WRITE_KEY>', {
    autoEnrich: false,
    defaultTrackingProperties: { ... }
});
```

The client constructor takes two arguments:
- `writeKey` - Your UserFlux write key. You can find this in the UserFlux dashboard under `Management > Account Settings > Developers > Write Key`
- `options` - An object containing the following optional properties:
    - `autoEnrich` - A boolean indicating whether or not to automatically enrich events with additional information such as location properties. Defaults to `false`
    - `defaultTrackingProperties` - An object containing any default properties to be sent with every event. Defaults to an empty object

## 3. Tracking events

```javascript
ufClient.track({
    userId: '<USER_ID>',
    anonymousId: '<ANONYMOUS_ID>',
    event: 'event_name',
    properties: { ... }
});
```

The `track` method takes a single argument:
- `parameters` - An object containing the following properties:
    - `userId` - (optional) A string representing the user ID of the user who performed the event
    - `anonymousId` - (optional) A optional string representing the anonymous ID of the user who performed the event
    - `event` - (required) A string representing the name of the event
    - `properties` - (optional) An object containing any properties to be sent with the event. Defaults to an empty object

Note: At least one of `userId` or `anonymousId` must be provided.
Note: This method is asynchronous and can be awaited if required.

## 4. Identifying users
    
```javascript
ufClient.identify({
    userId: '<USER_ID>',
    anonymousId: '<ANONYMOUS_ID>',
    properties: { ... }
});
```

The `identify` method takes a single argument:
- `parameters` - An object containing the following properties:
    - `userId` - (optional) A string representing the user ID of the user you're identifying with attributes
    - `anonymousId` - (optional) A optional string representing the anonymous ID of the user you're identifying with attributes
    - `properties` - (required) An object containing any attributes to be associated with the users profile

Note: At least one of `userId` or `anonymousId` must be provided.
Note: This method is asynchronous and can be awaited if required.

# Other Methods Available

## getUserIdFromCookie

```javascript
UserFlux.getUserIdFromCookie(req.headers.cookie)
```

If you're using the backend SDK in conjunction with the frontend SDK, you can use this method to extract the user ID set by the frontend SDK from the cookie header of an HTTP request.
The `getUserIdFromCookie` method takes a single argument:
- `cookie` - A string representing the cookie header from an HTTP request

## getAnonymousIdFromCookie

```javascript
UserFlux.getAnonymousIdFromCookie(req.headers.cookie)
```

If you're using the backend SDK in conjunction with the frontend SDK, you can use this method to extract the anonymous ID set by the frontend SDK from the cookie header of an HTTP request.
The `getAnonymousIdFromCookie` method takes a single argument:
- `cookie` - A string representing the cookie header from an HTTP request
