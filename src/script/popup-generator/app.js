const elementsHook = {
	popupTitle: document.getElementById('headerText'),
	popupCSS: document.getElementById('customCSS'),
	backdrop: {
		close: document.getElementById('close'),
		clickThrough: document.getElementById('clickThr'),
		CSS: document.getElementById('backdropCSS'),
	},
	animation: {
		reveal: document.getElementById('reveal'),
		hide: document.getElementById('hide'),
		type: document.getElementById('animationType'),
	},
	addButton: document.getElementById('addButton'),
	content: document.getElementById('content'),
	optionControls: {
		prev: document.getElementById('prev'),
		copy: document.getElementById('cpy'),
		reset: document.getElementById('reset'),
	},
};

const validate = () => {
	const elements = [...document.querySelectorAll('.more')];
	console.log('siem');
	if (elementsHook.popupTitle.value.trim().length === 0) {
		elements.forEach(el => {
			el.style.display = 'none';
		});
	} else {
		elements.forEach(el => {
			el.style.display = '';
		});
	}
};

const getConfigObj = () => {
	const title = elementsHook.popupTitle.value;
	const options = {
		customCss: elementsHook.popupCSS.value,
		backdrop: {
			closeOnClick: elementsHook.backdrop.close.value,
			clickThrough: elementsHook.backdrop.clickThrough.value,
			customCss: elementsHook.backdrop.CSS.value,
		},
		buttons,
		position,
		content,
		animation,
	};
	return {
		title,
		options,
	};
};

validate();

elementsHook.popupTitle.addEventListener('input', validate);
