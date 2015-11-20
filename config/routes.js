/**
 * Routes
 *
 * Use this file to add any module specific routes to the main Sails
 * route object.
 */


module.exports = {

    'POST /cas/v1/tickets': 'appdev-cas-proxy/CasProxyController.getTGT',
    
    'POST /cas/v1/tickets/:tgt': 'appdev-cas-proxy/CasProxyController.getST',
    
};

