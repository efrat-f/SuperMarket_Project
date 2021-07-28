var nodemailer = require('nodemailer');

const Email = {
    sendEmail: (email) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'coursebackend@gmail.com',
                pass: 'tulips66'
            }
        });
        var mailOptions = {
            from: 'coursebackend@gmail.com',
            to: email + ', efrat0533193504@gmail.com',
            subject: 'The registration was successful!',
            text: 'Fun shopping, Efriuts'
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}
module.exports = Email;
