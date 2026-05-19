const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'mail.hosting.reg.ru',
    port: 587,
    secure: true,
    auth: {
        user: 'admin@form-send.ru',
        pass: process.env.EMAIL_PASS
    }
});

async function sendMail(to, subject, html) {
    return await transporter.sendMail({
        from: '"Форма связи" <admin@form-send.ru>',
        to: to,
        subject: subject,
        html: html
    });
}

module.exports = { sendMail };