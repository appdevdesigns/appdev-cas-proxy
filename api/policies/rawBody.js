/**
 * hasPermission.js
 *
 * @module      :: Policy
 * @description :: Sets req.rawBody to the original body content of the request.
 */
module.exports = function(req, res, next) {
    
    switch (typeof req.body) {
        // No other body parser before this
        case 'undefined':
            var data = '';
            req.setEncoding('utf8');
            req.on('data', function(chunk) { 
               data += chunk;
            });
            req.on('end', function() {
                if (data != '') {
                    req.rawBody = data;
                }
                next();
            });
            req.on('error', function(err) {
                next(err);
            });
            break;
        
        // Another body parser already provided a string body
        default:
        case 'string':
            req.rawBody = req.body;
            next();
            break;
        
        // Assume it is a key-value pair basic object.
        // Convert to form-url-encoded
        case 'object':
            var data = '';
            for (var key in req.body) {
                if (data.length > 0) data += '&';
                data += encodeURIComponent(key) + '=';
                data += encodeURIComponent(req.body[key]);
            }
            req.rawBody = data;
            next();
            break;
    }
    
};





