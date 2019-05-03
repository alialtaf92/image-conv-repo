var express = require('express')
var router = express.Router()
require('dotenv').config()
const errorHandler = require('../helpers/errorHandler')
var path = require('path')
const im = require('imagemagick')
const _ = require('lodash')
let globalConstants = require('../config/globalConstants')

//* POST files/ */
router.post('/', async (req, res, next) => {
    try {
        if (!req.body || !req.body.inputName || !req.body.outputName || !req.body.file || !req.body.imageArguments) {
            let err = errorHandler.setParamsValidationError(req.body, 'inputName', 'outputName', 'file', 'imageArguments')
            next(err)
        } else {
            let supportedFormats = ['.png', '.jpg']
            let inputFileExtension = path.extname(req.body.inputName).toLowerCase()
            let outputFileExtension = path.extname(req.body.outputName).toLowerCase()
            var base64Data = req.body.file.replace(/^data:image\/png;base64,/, "");

            fs.writeFileSync(req.body.inputName, base64Data, globalConstants.STRING_FORMATS.BASE64)
            
            if(_.includes(supportedFormats, inputFileExtension) && _.includes(supportedFormats, outputFileExtension)) {
                convertAndUploadImage(res, req.body.inputname, req.body.outputname, req.body.imageArguments)
            }
        }   
    } catch (err) {
        next(err)
    }
})

function convertAndUploadImage (res, filename, outputName, args)
{
    args.unshift(filename)
    args.push(outputName)
    
    im.convert(args, function(err, stdout, stderr) {
        if(err) 
            console.log('err in im conv : ', err)
        
        let outfile = fs.readFileSync(outputName)
        res.send(outfile)
    });
}

module.exports = router
