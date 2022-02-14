const buttonClass = {
	default: 'popup-button-default',
	danger: 'popup-button-danger',
};

const modalClass = {
	default: 'modal-align-middle',
	bottom: 'modal-align-bottom',
	top: 'modal-align-top',
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

const getTitle = titleText => {
	const title = document.createElement('h2');
	title.textContent = titleText;
	return title;
};

const getSecondaryText = secondaryText => {
	const textElement = document.createElement('p');
	textElement.textContent = secondaryText;
	return secondaryText;
};

const getUpperSection = (title, lowerText) => {
	const sectionWrapper = document.createElement('section');
	const titleElement = getTitle(title);
	const lowerTextElement = getSecondaryText(lowerText);
	sectionWrapper.append(titleElement, lowerTextElement);
	return sectionWrapper;
};

const getButton = (innerHTML, callback, closeOnClick = false) => {
	const button = document.createElement('button');
	button.innerHTML = innerHTML;
	if (callback === undefined) {
		button.addEventListener('click', () => closeModal(button));
		button.classList.add(buttonClass.default);
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

const getDefaultModal = (title, bottomText) => {
	const button = getButton('Ok');
	const btnSection = getButtonSection();
	const modal = document.createElement('div');
	modal.classList.add('modal-middle');
	btnSection.append(button);
	modal.append(getUpperSection(title, bottomText));
	modal.append(btnSection);
	const backdrop = createBackdrop();
	backdrop.append(modal);
	return backdrop;
};

const showModal = (titleText, bottomText, options) => {
	if (options) {
	} else if (titleText && bottomText) {
		const modal = getDefaultModal(titleText, bottomText);
		document.body.append(modal);
	} else {
		return;
	}
};
