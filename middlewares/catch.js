let logger = require('../helpers/logger')
module.exports = function(req, res, next) { 
	logger.info('request url is : ', req.url);
	logger.info('request method is : ', req.method);
	logger.info('request params query is : ', req.query);
	logger.info('request params body is : ', req.body);
	next();
}
