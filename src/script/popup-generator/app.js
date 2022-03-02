const elementsHook = {
	popupTitle: document.getElementById('headerText'),
	popupCSS: document.getElementById('customCSS'),
	backdrop: {
		close: document.getElementById('closeBack'),
		clickThrough: document.getElementById('clickThr'),
		CSS: document.getElementById('backdropCSS'),
	},
	animation: {
		reveal: document.getElementById('reveal'),
		hide: document.getElementById('hide'),
		type: document.getElementById('animationType'),
	},
	addButton: document.getElementById('addButton'),
	buttonContainer: document.getElementById('buttonContainer'),
	buttonContainerFold: document.getElementById('btnContainer'),
	content: document.getElementById('content'),
	optionControls: {
		prev: document.getElementById('prev'),
		copy: document.getElementById('cpy'),
		reset: document.getElementById('reset'),
	},
};

const validate = () => {
	const elements = [...document.querySelectorAll('.more')];
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

const getButtonsConfig = () => {};

const getAnimationConfig = () => {};

const getConfigObj = () => {
	const title = elementsHook.popupTitle.value;
	const options = {
		customCss: elementsHook.popupCSS.value,
		backdrop: {
			closeOnClick: elementsHook.backdrop.close.value,
			clickThrough: elementsHook.backdrop.clickThrough.value,
			customCss: elementsHook.backdrop.CSS.value,
		},
		buttons: getButtonsConfig(),
		position: elementsHook.position.value,
		content: elementsHook.content.value,
		animation: getAnimationConfig(),
	};
	return {
		title,
		options,
	};
};

const addButtonDiv = () => {
	const wrapper = document.createElement('div');
	wrapper.className = 'button-add-row';
	wrapper.innerHTML = `

        <div>
            <span>Button text [innerHTML]</span>
            <input type="text"/>
        </div>
        <div>
            <span>Close popup on click</span>
            <input type="checkbox" checked/>
        </div>
        <div>
            <span>Callback function</span>
            <input type="text"/>
        </div>
    `;

	elementsHook.buttonContainer.append(wrapper);
};

validate();

elementsHook.popupTitle.addEventListener('input', validate);
elementsHook.addButton.addEventListener('click', () => {
	addButtonDiv();
	elementsHook.buttonContainer.classList.remove('hide-btn-container');
});
elementsHook.buttonContainerFold.addEventListener('click', () => {
	elementsHook.buttonContainer.classList.toggle('hide-btn-container');
});
