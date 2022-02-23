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
			this.cssClass = cssClasses;
			this.addClassesToElement(this.element, this.cssClass);
		}
		if (attributes) {
			this.attributes = Array.isArray(attributes) ? attributes : [attributes];
			this.addAttributesToElement(this.element, this.attributes);
		}
	}

	addClassesToElement(element, customCSS) {
		element.className = customCSS;
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
		//reveal animation false/zoom/fade/zoomFade
		//hide animation false/zoom/fade/zoomFade
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
		if (options.closeOnClick !== false)
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
		customCssClasses = 'popup-button-default',
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
		return new Backdrop(backdropOptions).getBackdropElement();
	}

	getPopupContent(options) {
		return new Component(
			options.elementType,
			options.innerHTML,
			options.customCss,
			options.attributes
		).element;
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
		if (options.content)
			this.popupContentElement = this.getPopupContent(options.content);
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
		popupElement.append(this.titleElemet);
		if (this.popupContentElement) popupElement.append(this.popupContentElement);
		popupElement.append(buttonsDiv);
		this.backdrop.append(popupElement);
		this.popupElement = popupElement;
	}

	show() {
		//tu musi byc animacja, dodanie klasy i pokazanie
		document.body.append(this.backdrop);
	}

	hide() {
		//tu musi byc animacja, dodanie jakiejs klasy i chowanie
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

const cookiesText =
	'Cookies are small text files that websites place on the computers and mobile devices of people who visit those websites.';

const blueprintPopup = new Popup('What are Cookies', {
	customCss: 'siema popup',
	backdrop: {
		customCss: 'siema popupjs-backdrop',
	},
	buttons: [
		new Button('Nothing', false, () => console.log('clicked'), 'custom'),
		new Button('Close', true, false),
	],
	position: 'middle',
	content: {
		elementType: 'div',
		innerHTML: cookiesText,
	},
});

console.log(blueprintPopup);
blueprintPopup.show();
