class Style {
	constructor(targetElement, customCss) {
		if (!targetElement) throw 'Target Element is invalid';
		if (!customCss) throw 'Invaid style options';
	}
}

class Attribute {
	constructor(id, value) {
		this.attrId = id;
		this.value = value;
	}
}
class Component {
	constructor(type, innerHTML, cssClasses, attributes) {
		this.initValues(type, innerHTML, cssClasses, attributes);
	}

	initValues(type, innerText, cssClasses, attributes) {
		if (!type || type === '') {
			throw 'cannot create element without type';
		} else {
			this.type = type;
			this.element = this.getTypedElement();
		}
		if (innerText) {
			this.text = innerText;
			this.element.innerHTML = this.text;
		}
		if (cssClasses) {
			this.cssClass = Array.isArray(cssClasses) ? cssClasses : [cssClasses];
			this.addClassesToElement(this.element, this.cssClass);
		}
		if (attributes) {
			this.attributes = Array.isArray(attributes) ? attributes : [attributes];
			this.addAttributesToElement(this.element, this.attributes);
		}
	}

	addClassesToElement(element, classArr) {
		classArr.forEach(cssClass => {
			element.classList.add(cssClass);
		});
	}

	addAttributesToElement(element, attributesArr) {
		attributesArr.forEach(atributePair => {
			element.setAttribute(atributePair.attrId, atributePair.value);
		});
	}

	getTypedElement() {
		return document.createElement(this.type);
	}
}
class Animation {
	constructor(animationType) {
		//zoom/fade/zoomFade
	}

	reveal() {}

	hide() {}
}
class Backdrop extends Component {
	constructor(options = { closeOnClick: true, clickThrough: false }) {
		super('div', '', 'popupjs-backdrop');
		this.initOptions(options);
	}

	initOptions(options) {
		if (options.closeOnClick === true)
			this.element.addEventListener('click', e => {
				if (e.target === this.element) this.hideBackdrop();
			});
		if (options.clickThrough === true) this.element.style.pointerEvents = 'none';
		console.log(options.customCss, this.element);
		if (options.customCss) this.element.className = options.customCss;
	}

	hideBackdrop() {
		//tutaj sie zrobi jakas uniwersalna klase do chowania, np class Animiation bedzie to robic
		this.element.remove();
	}

	getBackdropElement() {
		return this.element;
	}
}
class Button extends Component {
	constructor(
		innerHTML = 'Ok',
		closeOnClick = true,
		callbackFunc = false,
		customCssClasses,
		customAttributes
	) {
		super('button', innerHTML, customCssClasses, customAttributes);
		this.getButton(closeOnClick, callbackFunc);
	}

	getButtonElement() {
		return this.element;
	}

	getButton(closeOnClick, callbackFunc) {
		this.closeOnClick = closeOnClick;
		this.callbackFunc = callbackFunc;
		if (closeOnClick === true) {
			this.element.addEventListener('click', () => {
				console.log(this.element, 'close popup');
				this.element.closest('.popupjs-backdrop').remove();
			});
		}
		if (callbackFunc) this.element.addEventListener('click', callbackFunc);
	}
}
class Position {}

class Config {
	#buttons;

	constructor(options) {
		this.initOptions(options);
	}

	getDefaultButton() {
		return new Button('Ok', true, false, 'popup-button-default');
	}

	getDefaultPosition() {
		return 'middle';
	}

	getCustomBackdrop(backdropOptions) {
		console.log('config class ', backdropOptions);
		return new Backdrop(backdropOptions).getBackdropElement();
	}

	initOptions(options) {
		this.backdrop = options.backdrop
			? this.getCustomBackdrop(options.backdrop)
			: new Backdrop().getBackdropElement();
		this.#buttons = options.buttons ? options.buttons : [this.getDefaultButton()];
		this.position = options.position ? options.position : this.getDefaultPosition();
		if (options.customCss) {
			this.customCss = options.customCss;
		} else {
			this.customCss = 'popup';
		}
	}
	generateButtonElements() {
		this.buttonElements = [];
		this.#buttons.forEach(button => {
			this.buttonElements.push(button.element);
		});
	}
}
class Popup extends Config {
	constructor(titleInnerHTML, options = {}) {
		//{buttons,backdropOptions,position,animation,[css classes]}} - options
		super(options);
		this.generateTitle(titleInnerHTML);
		this.generatePopupElement();
	}

	generateTitle(title) {
		this.titleElemet = new Component('h2', title, 'popup-title').element;
	}

	generateButtonsDiv() {
		return new Component('div', '', 'popup-buttons').element;
	}

	generatePopupElement() {
		this.generateButtonElements();
		const popupElement = new Component('div', '', this.customCss).element;
		const buttonsDiv = this.generateButtonsDiv();
		buttonsDiv.append(...this.buttonElements);
		popupElement.append(this.titleElemet, buttonsDiv);
		this.backdrop.append(popupElement);
		this.popupElement = popupElement;
	}

	show() {
		document.body.append(this.backdrop);
	}

	hide() {
		this.backdrop.remove();
	}
}

const component = new Component('button', 'ok', 'foo', new Attribute('id', 'bar'));

const component2 = new Component(
	'button',
	'ok',
	['foo', 'bar-class'],
	[new Attribute('id', 'siema'), new Attribute('disabled', 'false')]
);

// console.log(component);
// console.log(component2);
// document.querySelector('#app').append(component.element, component2.element);

// const popup1 = new Popup('Helllo', { buttons: [new Button('foo')] });
// const defaultPopup = new Popup('Defalult popup');
// console.log(defaultPopup);
// defaultPopup.show();

const blueprintPopup = new Popup('title', {
	customCss: ['siema', 'popup'],
	backdrop: {
		closeOnClick: false,
		customCss: 'siema popupjs-backdrop',
	},
	buttons: [
		new Button(
			'This button should not close',
			false,
			() => console.log('clicked'),
			'custom'
		),
	],
	position: 'middle',
});

blueprintPopup.show();
//do zrobienia backdrop
