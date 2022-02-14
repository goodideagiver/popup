const buttonClass = {
	default: 'popup-button-default',
	danger: 'popup-button-danger',
};

const closeModal = element => {
	element.closest('.popupjs-backdrop').remove();
};

const createBackdrop = () => {
	const backdrop = document.createElement('section');
	backdrop.classList.add('popupjs-backdrop');
	backdrop.addEventListener('click', e => {
		if (e.target !== backdrop) {
			return;
		}
		closeModal(backdrop);
	});
	return backdrop;
};

const getButton = (innerHTML, callback, closeOnClick = false) => {
	const button = document.createElement('button');
	button.innerHTML = innerHTML;
	if (!callback) {
		button.addEventListener('click', () => closeModal(element));
	} else {
		button.addEventListener('click', callback);
	}
	return button;
};

const generateButtons = objArr => {
	return objArr.map(buttonOption => {
		return getButton(buttonOption);
	});
};

const getButtonSection = () => {
	const buttonSection = document.createElement('section');
	buttonSection.classList.add('popup-buttons');
	return buttonSection;
};

const getDefaultModal = () => {
	const button = getButton('Ok');
	const btnSection = getButtonSection();
	const modal = document.createElement('div');
	modal.classList.add('modal-middle');
	btnSection.append(button);
	modal.append(btnSection);
	const backdrop = createBackdrop();
	backdrop.append(modal);
	return backdrop;
};

const showModal = (titleText, bottomText, options) => {
	if (options) {
	} else {
		const modal = getDefaultModal();
		document.body.append(modal);
	}
};
