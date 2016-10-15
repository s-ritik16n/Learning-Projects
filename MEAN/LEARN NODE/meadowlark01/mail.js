var nodemailer = require('nodemailer');
const credential = require('./credentials');

var mailTransport = nodemailer.createTransport('SMTP',{
    host:'smtp.meadowlark.com',
    secureConnection:true,
    port:465,
    auth:{
        user:crendentials.meadolark.user,
        pass:crendentials.meadolark.pass,
    }
});

module.exports = mailTransport;