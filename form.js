const resetBtn = document.querySelector('.reset');
const submitBtn = document.querySelector('.send');

//functions that help with validation and with giving feedback to user
const checkForEmptyField = input => {
	if (input.value == '') {
		updateValidationIcon(input, false);
		clearError(input);
		input.placeholder = 'Musisz uzupełnić to pole...';
		input.style.backgroundColor = 'tomato';
		return false;
	} else {
		input.placeholder = '';
		input.style.backgroundColor = '#fff';
		return true;
	}
};

const regexValidator = (input, regex, errorMsg) => {
	if (!checkForEmptyField(input)) {
		return false;
	} else if (regex.test(input.value) == false) {
		showError(input, errorMsg);
		updateValidationIcon(input, false);
		return false;
	} else {
		clearError(input);
		updateValidationIcon(input, true);
		return true;
	}
};

const showError = (input, errorMsg) => {
	const pError = input.parentElement.querySelector('.error-info');
	pError.textContent = errorMsg;
	pError.style.visibility = 'visible';
	input.style.backgroundColor = 'tomato';
};

const clearError = input => {
	const pError = input.parentElement.querySelector('.error-info');
	pError.textContent = '';
	pError.style.visibility = 'hidden';
	input.style.backgroundColor = '#fff';
};

const updateValidationIcon = (input, isValid) => {
	let checkIcon = input.parentElement.querySelector('.fa-check');
	if (isValid) {
		checkIcon.classList.add('valid');
	} else {
		checkIcon.classList.remove('valid');
	}
};

//clears all inputs and error notifications
const clearAll = () => {
	const allErrorP = document.querySelectorAll('.error-info');
	allErrorP.forEach(p => {
		p.textContent = '';
		p.style.visibility = 'hidden';
	});
	const allInputs = document.querySelectorAll('input');
	allInputs.forEach(input => {
		input.style.backgroundColor = '#fff';
		input.placeholder = '';
	});
	const allSelects = document.querySelectorAll('select');
	allSelects.forEach(select => {
		select.style.backgroundColor = '#fff';
	});
	const allIcons = document.querySelectorAll('.fa-check');
	allIcons.forEach(icon => {
		icon.classList.remove('valid');
	});
};

//functions that check if data entered in form is valid
const nameValidator = () => {
	const nameInput = document.querySelector('#name');
	const nameRegex = /^[A-ZĄĆĘŁŃÓŚŻŹ][a-ząćęłńóśżź]+$/;
	const errorMsg =
		'Imię zaczyna się od litery dużej, reszta to małe. Ma minimum 2 litery.';
	return regexValidator(nameInput, nameRegex, errorMsg);
};

const surnameValidator = () => {
	const surnameInput = document.querySelector('#surname');
	const surnameRegex = /^[A-Za-zĄ-Żą-żÓó\- ]+$/;
	const errorMsg =
		'Nazwisko może zawierać litery, spacje, myślniki - nie posiada cyfr';
	return regexValidator(surnameInput, surnameRegex, errorMsg);
};

const passwordValidator = () => {
	const minLength = 8;
	const passwordInput = document.querySelector('#password');
	const inputValue = passwordInput.value;
	if (!checkForEmptyField(passwordInput)) {
		updateValidationIcon(passwordInput, false);
		return false;
	} else if (inputValue.length < minLength) {
		const errorMsg = `Hasło musi się składać z co najmniej ${minLength} znaków. Powinno zwierać znaki specjalnie i cyfry`;
		showError(passwordInput, errorMsg);
		updateValidationIcon(passwordInput, false);
		return false;
	} else {
		clearError(passwordInput);
		updateValidationIcon(passwordInput, true);
		return true;
	}
};

const townValidator = () => {
	const streetNameInput = document.querySelector('#town');
	const streetNameRegex = /^[ÓóA-Za-zĄ-Żą-ż\- ]+$/;
	const errorMsg =
		'Dopuszczane miejcowości składają się z liter, spacji i myślników';
	return regexValidator(streetNameInput, streetNameRegex, errorMsg);
};

const streetNameValidator = () => {
	const streetNameInput = document.querySelector('#street');
	const streetNameRegex = /^[ÓóĄ-Żą-ża-zA-Z0-9 -]*$/;
	const errorMsg =
		'Nazwa ulicy może składać się z liter, cyfr, myślników i spacji.';
	return regexValidator(streetNameInput, streetNameRegex, errorMsg);
};

const houseNumberValidator = () => {
	const homeNumberInput = document.querySelector('#house-number');
	const homeNumberRegex = /^[A-Za-z0-9 -]+$/;
	const errorMsg =
		'Numer domu/mieszkania może składać się z liter, cyfr, myślników i spacji.';
	return regexValidator(homeNumberInput, homeNumberRegex, errorMsg);
};

const voivodeshipValidator = () => {
	const voivodeshipInput = document.querySelector('#voivodeship');
	if (voivodeshipInput.value == '0') {
		const errorMsg = `Proszę wybrać jakieś województwo.`;
		showError(voivodeshipInput, errorMsg);
		updateValidationIcon(voivodeshipInput, false);
		return false;
	} else {
		clearError(voivodeshipInput);
		updateValidationIcon(voivodeshipInput, true);
		return true;
	}
};

const birthDateValidator = () => {
	const minYear = 1900;
	const currentDate = new Date();
	const birthDateInput = document.querySelector('#birth-date');
	updateValidationIcon(birthDateInput, false);

	if (birthDateInput.value == '') {
		const errorMsg = `Proszę wybrać date urodzenia.`;
		showError(birthDateInput, errorMsg);
		return false;
	} else if (birthDateInput.value.slice(0, 4) < minYear) {
		const errorMsg = `Rok nie może być starszy niż ${minYear}`;
		showError(birthDateInput, errorMsg);
		return false;
	} else if (birthDateInput.value.slice(0, 4) > currentDate.getFullYear()) {
		const errorMsg = `Data nie może wyprzedzać dzisiejszego dnia`;
		showError(birthDateInput, errorMsg);
		return false;
	} else if (
		birthDateInput.value.slice(0, 4) == currentDate.getFullYear() &&
		birthDateInput.value.slice(5, 7) > currentDate.getMonth() + 1
	) {
		const errorMsg = `Data nie może wyprzedzać dzisiejszego dnia`;
		showError(birthDateInput, errorMsg);
		return false;
	} else if (
		birthDateInput.value.slice(0, 4) == currentDate.getFullYear() &&
		birthDateInput.value.slice(5, 7) == currentDate.getMonth() + 1 &&
		birthDateInput.value.slice(8, 10) > currentDate.getDate()
	) {
		const errorMsg = `Data nie może wyprzedzać dzisiejszego dnia`;
		showError(birthDateInput, errorMsg);
		return false;
	} else {
		clearError(birthDateInput);
		updateValidationIcon(birthDateInput, true);
		return true;
	}
};

const phoneNumberValidator = () => {
	const phoneNumberInput = document.querySelector('#phone-number');
	const phoneNumberRegex = /^\+\d{11}$/;
	const errorMsg =
		'Numer telefonu składa się tylko z cyfr. Ma format +48000000000';
	return regexValidator(phoneNumberInput, phoneNumberRegex, errorMsg);
};

const mailValidator = () => {
	const mailInput = document.querySelector('#email');
	const mailRegex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3})$/;
	const errorMsg = 'Adres email musi mieć formę twojanazwa@domena';
	return regexValidator(mailInput, mailRegex, errorMsg);
};

const radioValidator = () => {
	const radioButtons = document.querySelectorAll('input[type="radio"]');
	let choosenSex = false;
	const errorMsg = 'Proszę wybrać płeć.';

	radioButtons.forEach(radioButton => {
		if (radioButton.checked) {
			choosenSex = true;
		}
	});

	if (!choosenSex) {
		showError(radioButtons[0], errorMsg);
	} else {
		clearError(radioButtons[0]);
	}
	return choosenSex;
};

submitBtn.addEventListener('click', e => {
	e.preventDefault();
	let i1 = nameValidator();
	let i2 = surnameValidator();
	let i3 = passwordValidator();
	let i4 = townValidator();
	let i5 = streetNameValidator();
	let i6 = houseNumberValidator();
	let i7 = voivodeshipValidator();
	let i8 = birthDateValidator();
	let i9 = phoneNumberValidator();
	let i10 = mailValidator();
	let i11 = radioValidator();
	if (i1 && i2 && i3 && i4 && i5 && i6 && i7 && i8 && i9 && i10 && i11) {
		document.querySelector('form').submit();
	}
});

resetBtn.addEventListener('click', clearAll);
