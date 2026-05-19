const formEl = document.getElementById("form");
const button = formEl.querySelector("button");

function validateName(name) {
    const regex = /^[А-Яа-яA-Za-z\- ]{2,30}$/;
    return regex.test(name);
}

function validatePhone(phone) {
    const regex = /^(\+7|8)[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    return regex.test(phone);
}

function validateEmail(email) {
    const regex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    return regex.test(email);
}

function validateComment(comment) {
  return comment !== "";
}

formEl.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = {
        name: formEl.name.value,
        phone: formEl.phone.value,
        email: formEl.email.value,
        comment: formEl.comment.value,
    }


    if (!validateName(formData.name)) {
        alert("Имя должно содержать только буквы (2-30 символов)");
        return;
    }

    if (!validatePhone(formData.phone)) {
        alert("Введите номер в формате: +7(123)456-78-90 или 8-123-456-78-90");
        return;
    }

    if (!validateEmail(formData.email)) {
        alert("Введите корректный email (пример: name@domain.ru)");
        return;
    }

    if (!validateComment(formData.comment)) {
        alert("Введите сообщение");
        return;
    }

    try {
        button.disabled = true;
        button.innerText = "Отправка...";

        const response = await fetch("/form", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        if(!response.ok) {
            throw new Error(JSON.stringify(data));
        }

        formEl.reset();

        alert("Сообщение успешно отправлено!");

        console.log("response", data);

    } catch (e){
        console.error("Ошибка:", e);
    } finally {
        button.disabled = false;
        button.innerText = "Отправить";
    }
});