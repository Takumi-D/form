function validateFields(name, phone, email, comment) {
    if (!name || !phone || !email || !comment) {
        return { error: "Заполните все поля" };
    }

    if (name.length < 2) {
        return { error: "Имя слишком короткое" };
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
        return { error: "Неверный номер телефона" };
    }

    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { error: "Неверный email" };
    }

    return null;
}

module.exports = {
    validateFields,
}