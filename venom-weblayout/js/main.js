// https://youtu.be/hBO8auZZ8Eg?t=7855

const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".nav-menu");
const menuButtonClose = document.querySelector(".menu-button-close");
menuButton.addEventListener("click", () => {
	menu.classList.add("is-open");
	menuButtonClose.classList.add("is-active");
});
menuButtonClose.addEventListener("click", () => {
	menu.classList.remove("is-open");
	menuButtonClose.classList.remove("is-active");
});

/***  Всплывающая форма ***/

const hideForm = document.querySelector(".hide-form");
const orderTicket = document.querySelector(".order-ticket");
const orderTrigger = document.querySelector(".order-trigger");
const orderTicketForm = document.querySelector(".order-ticket__form");

const orderTicketFormWrapper = document.querySelector(".order-ticket__form-wrapper");
const orderTicketPreloaderWrapper = document.querySelector(".order-ticket__preloader-wrapper");
const orderTicketThanksWrapper = document.querySelector(".order-ticket__thanks-wrapper");
const orderTicketThanksName = document.querySelector(".order-ticket__thanks-name");

const heightForm = orderTicket.offsetHeight;

const sendData = (data, callback, callBefore) => {
	if (callBefore) callBefore();

	fetch("http://localhost:3000/api", {
		method: "POST",
		headers: {
			"Content-type": "application/json; charset=utf-8",
		},
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then(callback);
};

const showPreloader = () => {
	orderTicketFormWrapper.style.display = "none";
	orderTicketPreloaderWrapper.style.display = "block";
};

const showThanks = (data) => {
	orderTicketFormWrapper.style.display = "none";
	orderTicketPreloaderWrapper.style.display = "none";
	orderTicketThanksWrapper.style.display = "block";
	orderTicketThanksName.textContent = data.name;
};

// Позиция кнопки
setTimeout(() => {
	hideForm.style.bottom = -heightForm + "px";
	orderTicket.style.height = heightForm + 'px';
}, 1000);

// Триггер "всплывания" формы
orderTrigger.addEventListener("click", () => {
	hideForm.classList.toggle("hide-form-active");
});

// Защита от наезжания лейбла на инпут с текстом
orderTicketForm.addEventListener("change", (event) => {
	const target = event.target;
	const label = target.labels[0];
	if (label && target.value) {
		label.classList.add("order-ticket__label-focus");
	} else {
		label.classList.remove("order-ticket__label-focus");
	}
});

// Отправка формы
orderTicketForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const formData = new FormData(orderTicketForm);

	const data = {};

	for (const [name, value] of formData) {
		data[name] = value;
	}

	sendData(data, showThanks, showPreloader);
});
