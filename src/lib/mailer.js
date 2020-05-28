const nodemailer = require('nodemailer')

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2dae628a56a367",
    pass: "609090fc94fc81"
  }
});

module.exports = transport
 