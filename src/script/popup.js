const createBackdrop = () => {
	const backdrop = document.createElement('section');
	backdrop.classList.add('popupjs-backdrop');
	return backdrop;
};

const closeModal = element => {
	element.closest('.popupjs-backdrop').remove();
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

const showModal = (titleText, bottomText, options) => {
	if (options) {
	}
};
