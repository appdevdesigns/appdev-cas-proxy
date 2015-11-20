/**
 * CasProxyController
 *
 * This is an HTTP proxy between a mobile app and the CAS server's RESTful
 * interface.
 *
 * This is not the same thing as the CAS authentication proxy that allows
 * an application to request 3rd party services on behalf of the user.
 */
 
var url = require('url');
var fs = require('fs');
var request = require('request');

module.exports = {
    
    /**
     * /cas/v1/tickets
     * 
     * Proxied route for retrieving the CAS TGT
     */
    getTGT: function(req, res) {
        
        var casBaseURL = sails.config.cas.baseURL;
        if (!casBaseURL) {
            throw new Error('CAS base URL is not defined in the config');
        }
        var proxyBaseURL = req.externalBaseURL + '/cas';
        
        request({
            url: casBaseURL + '/v1/tickets',
            method: 'POST',
            body: req.rawBody,
            followRedirect: false
        }, function(err, message, body) {
            if (err) {
                res.send(err);
            } else {
                // Replace TGT URL with the proxy version
                var realTGT = message.headers['location'] || '';
                var proxyTGT = realTGT.replace(casBaseURL, proxyBaseURL);
                message.headers['location'] = proxyTGT;
                body = body.replace(realTGT, proxyTGT);
                res.set('location', message.headers['location']);
                res.send(200, body); // code 200 allows this to work in Firefox
            }
        });
    },
    
    
    
    /**
     * /cas/v1/tickets/:tgt
     * 
     * Proxied route for retrieving the CAS service ticket
     */
    getST: function(req, res) {
        
        var tgt = req.param('tgt');
        var casBaseURL = sails.config.cas.baseURL;
        if (!casBaseURL) {
            throw new Error('CAS base URL is not defined in the config');
        }
        
        request({
            url: casBaseURL + '/v1/tickets/' + tgt,
            method: 'POST',
            body: req.rawBody
        })
        .pipe(res)
    }


}
