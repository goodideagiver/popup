const createBackdrop = () => {
	const backdrop = document.createElement('section');
	backdrop.classList.add('popupjs-backdrop');
	return backdrop;
};

const getButton = (innerHTML, callback) => {
	const button = document.createElement('button');
	button.innerHTML = innerHTML;
	button.addEventListener('click', callback);
	return button;
};
