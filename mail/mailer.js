const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendMail(to, subject, html) {
    return await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: to,
        subject: subject,
        html: html
    });
}

module.exports = { sendMail };