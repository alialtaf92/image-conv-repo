//let verifyTokenMiddleware = require('../middlewares/verifyToken')

module.exports = function (app) {
  app.use('/files', require('../controllers/files'))
}
