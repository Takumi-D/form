const express = require(`express`);
const { validateFields } = require("../helpers/validate");
const { sendMail } = require("../mail/mailer");

const router = express.Router();


router.post("/form", async (req, res) => {
    const { name, phone, email, comment } = req.body;

    const error = validateFields(name, phone, email, comment);
    if (error) {
        return res.status(400).json(error);
    }

    try{
        await sendMail(
            "admin@form-send.ru",
            "Новое сообщение с сайта",
            `<h2>Новое сообщение</h2>
             <p>Имя: ${name}</p>
             <p>Телефон: ${phone}</p>
             <p>Email: ${email}</p>
             <p>Комментарий: ${comment}</p>`
        );

        await sendMail(
            email,
            "Копия вашего сообщения",
            `<h2>Спасибо, ${name}!</h2>
             <p>Мы получили ваше сообщение. Спасибо!</p>
             <p>Ваш комментарий: ${comment}</p>`
        );

        res.json({success: true});
    } catch (error){
        console.error("SMTP ERROR:", error);
        res.status(500).json({ error: error.message, full: error });
    }
})

module.exports = router;