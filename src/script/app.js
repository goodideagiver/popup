const buttonTop = document.getElementById('top');
const buttonMiddle = document.getElementById('middle');
const buttonBottom = document.getElementById('bottom');

buttonTop.addEventListener('click', () => blueprintPopup.show());

const popupMiddle = new Popup('Middle', {
	content: {
		elementType: 'div',
		innerHTML: 'Custom popup in the middle',
	},
});

buttonMiddle.addEventListener('click', () => popupMiddle.show());

const popupBottom = new Popup('Bottom', {
	position: 'bottom',
	animation: {
		type: 'fade',
		duration: {
			reveal: 1,
			hide: 2,
		},
	},
	backdrop: {
		closeOnClick: true,
	},
});

buttonBottom.addEventListener('click', () => popupBottom.show());
