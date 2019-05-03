'use strict'

const nodemailer = require('nodemailer')
const logger = require('./logger')
require('dotenv').config()

let mailer = {}

mailer.sendEmail = function (to, from, subject, text, html) {
  let transporterOptions = {
    service: 'gmail',
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  }
  console.log('transporterOptions are : ', transporterOptions.auth)
  let transporter = nodemailer.createTransport(transporterOptions)

  let mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text,
    html: html
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return logger.error(err)
    }

    logger.info('Message sent: ', info.messageId)
    logger.info('Preview URL: ', nodemailer.getTestMessageURL(info))
  })
}

module.exports = mailer
