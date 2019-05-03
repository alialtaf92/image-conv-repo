'use strict'

require('dotenv').config()
const AWS = require('aws-sdk')
AWS.config.loadFromPath('./config/awsConfig.json')
const S3 = new AWS.S3()

// multimedia.processFile = function (params, socketId, callback, resolve) {
//   try {
//     const lambda = new AWS.Lambda({region: params.s3Region, httpOptions:{timeout: 600000}})
//     let funcParams = {
//       FunctionName: 'fileProcessingLambda',
//       InvocationType: 'RequestResponse',
//       LogType: 'Tail',
//       Payload: JSON.stringify(params)
//     }
//     let result
//     lambda.invoke(funcParams, function (err, data) {
//       if (err) {
//         console.log('error in lambda : ', err)
//         callback(err, 'failure', socketId, resolve)
//       } else {
//         result = JSON.parse(data.Payload)
//         callback(result, 'success', socketId, resolve)
//       }
//     })
//   } catch (e) {
//     console.log('error is : ', e)
//   }
// }

multimedia.uploadFile = async (fileData, awsKey, s3Location) => {

  let bucket = s3Location + '-' + process.env.BUCKET_NAME

  let params = {
    Bucket: bucket,
    Key: awsKey,
    Body: fileData
  }

  let retVal = await S3.putObject(params).promise()
  return retVal
}

module.exports = multimedia
