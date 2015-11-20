# appdev-cas-proxy
Module for the AppDev Sails framework.

HTTP proxy between a client side app and a CAS server's RESTful interface. It is intended to be used when running a Cordova app as a web app served from Sails, where it would have cross-site request restrictions imposed by the web browser. This proxy would allow the app to authenticate with the CAS server as if it were on the same domain and port.

For proper security on a production server, make sure your Sails server is configured for HTTPS. Otherwise the CAS authentication credentials will be sent in the clear between the client and the Sails server.

This is not the same thing as the CAS authentication proxy that allows an application to request 3rd party services on behalf of the user.
