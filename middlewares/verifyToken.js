let jwt = require('jsonwebtoken')
const HttpStatus = require('http-status-codes')
let User = require('../models/User')
function verifyToken(req, res, next) {
    let token = req.headers['x-access-token']
    if(!token)
        return res.status(HttpStatus.UNAUTHORIZED).send({auth: false, message: 'No Token Provided'})
    
    jwt.verify(token, process.env.APP_SECRET, function (err, result) {
        if(err)
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({auth: false, message: 'Failed to authenticate token . '})
        if(result.role && result.role === 'photon') {
            next()
        } else {
            let user = User.findOne({_id: result.data.id})
            if (!user)
                return res.status(HttpStatus.UNAUTHORIZED).send({auth: false, message: 'Invalid Token'})

            next()
        }
    })
}

module.exports = verifyToken