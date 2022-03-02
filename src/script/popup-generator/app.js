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
	position: document.getElementById('position'),
	addButton: document.getElementById('addButton'),
	buttonContainer: document.getElementById('buttonContainer'),
	buttonContainerFold: document.getElementById('btnContainer'),
	content: document.getElementById('content'),
	optionControls: {
		prev: document.getElementById('prev'),
		copy: document.getElementById('cpy'),
		reset: document.getElementById('reset'),
	},
	form: document.querySelector('form'),
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

class ButtonRow {
	constructor(text, closeOnClick, callbackFunName) {
		this.buttonInit(text, closeOnClick, callbackFunName);
	}

	buttonInit(text, closeOnClick, callbackFunName) {
		this.text = text;
		if (closeOnClick !== true && closeOnClick !== false) {
			this.closeOnClick = true;
		} else {
			this.closeOnClick = closeOnClick;
		}
		if (callbackFunName) {
			this.callbackFunc = callbackFunName;
		}
	}
}

const getButtonsConfig = () => {
	const buttons = [...document.querySelectorAll('.button-add-row')];
	if (buttons.length === 0) {
		return;
	}
	const buttonOptions = buttons.map(button => {
		const inputs = [...button.querySelectorAll('input')];
		return inputs.map((input, index) => {
			if (input.type === 'checkbox') return input.checked;
			return input.value;
		});
	});
	const options = buttonOptions.filter(option => option[0] !== '' && option[0]);
	return options.length > 0 ? options : undefined;
};

const getAnimationConfig = () => {
	options = {
		reveal: elementsHook.animation.reveal.value,
		hide: elementsHook.animation.hide.value,
		type: elementsHook.animation.type.value,
	};

	if ((options.hide && !options.reveal) || (options.reveal && !options.hide)) {
		return undefined;
	}

	Object.keys(options).forEach(k => options[k] == '' && delete options[k]);
	Object.keys(options).forEach(k => options[k] == undefined && delete options[k]);
	return options;
};

const getConfigObj = () => {
	const outputElementHook = document.getElementById('output');

	const title = elementsHook.popupTitle.value;
	const options = {
		customCss: elementsHook.popupCSS.value,
		backdrop: {
			closeOnClick: elementsHook.backdrop.close.checked,
			clickThrough: elementsHook.backdrop.clickThrough.checked,
			customCss: elementsHook.backdrop.CSS.value,
		},
		buttons: getButtonsConfig(),
		position: elementsHook.position.value,
		content: elementsHook.content.value,
		animation: getAnimationConfig(),
	};
	Object.keys(options).forEach(k => options[k] == '' && delete options[k]);
	Object.keys(options).forEach(k => options[k] == undefined && delete options[k]);
	outputElementHook.innerText = JSON.stringify(options).replace(/"([^"]+)":/g, '$1:');
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
        <div>
            <button>Delete</button>
        </div>
    `;
	wrapper.querySelector('button').addEventListener('click', () => wrapper.remove());
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
elementsHook.form.addEventListener('input', e => {
	console.log(e.target.tagName);
	if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
		console.log(getConfigObj());
	}
});
elementsHook.form.addEventListener('click', e => {
	if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') {
		console.log(getConfigObj());
	}
});
