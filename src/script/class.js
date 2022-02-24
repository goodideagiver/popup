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

class Backdrop extends Component {
	constructor(options = { closeOnClick: true, clickThrough: false }) {
		super('div', '', 'popupjs-backdrop');
		this.initOptions(options);
	}

	initOptions(options) {
		if (options.clickThrough === true) this.element.style.pointerEvents = 'none';
		if (options.customCss) this.element.className = options.customCss;
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
		this.createButton(closeOnClick, callbackFunc);
	}

	createButton(closeOnClick, callbackFunc) {
		this.closeOnClick = closeOnClick;
		this.callbackFunc = callbackFunc;
		if (closeOnClick === true) {
			this.element.addEventListener('click', () => {
				this.element.closest('.popupjs-backdrop').remove();
			});
		}
		if (callbackFunc) this.element.addEventListener('click', callbackFunc);
	}
}

class CustomAnimation {
	duration = {
		reveal: 0.5,
		hide: 0.5,
	};

	animationType = {
		zoom: `transform: scale(0.1)`,
		fade: `opacity: 0`,
		custom: 'custom css class',
		none: 'none',
	};

	constructor(options = { duration: 0.5, type: 'zoom' }) {
		this.optionsHandler(options);
	}

	optionsHandler(options) {
		switch (options.type) {
			case 'zoom':
				this.selectedAnimationType = this.animationType.zoom;
				break;
			case 'fade':
				this.selectedAnimationType = this.animationType.fade;
				break;
			case 'zoomFade':
				this.selectedAnimationType =
					this.animationType.fade + `; ` + this.animationType.zoom;
				break;
			default:
				throw 'Invalid animation type';
				break;
		}
	}

	revealAnimation(backdrop, popup) {
		backdrop.style = `opacity = 0; transition: ${this.duration.reveal}s`;
		popup.style = `opacity = 0; transition: ${this.duration.reveal}s`;
		setTimeout(() => {
			backdrop.style = `transition: ${this.duration.reveal}s`;
			popup.style = `transition: ${this.duration.reveal}s`;
		}, 1);
	}

	hideAnimation(backdrop, popup) {
		backdrop.style = `transition: ${this.duration.reveal}s`;
		popup.style = `transition: ${this.duration.reveal}s`;
		setTimeout(() => {
			backdrop.style = `opacity = 0; transition: ${this.duration.reveal}s`;
			popup.style = `opacity = 0; transition: ${this.duration.reveal}s`;
		}, 1);
	}
}
class Config extends CustomAnimation {
	#buttons;

	constructor(options) {
		super(options.animation);
		this.initOptions(options);
	}

	getDefaultButtonElement() {
		return new Button('Ok', true, false, 'popup-button-default');
	}

	getDefaultPosition() {
		return 'middle';
	}

	getCustomBackdropElement(backdropOptions) {
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

	createPopupElement(options) {
		this.popupElement = new Component('div', '', options.customCss).element;
	}

	initOptions(options) {
		this.createPopupElement(options);
		this.backdrop = options.backdrop
			? this.getCustomBackdropElement(options.backdrop)
			: new Backdrop().getBackdropElement();
		this.#buttons = options.buttons
			? options.buttons
			: [this.getDefaultButtonElement()];
		this.position = options.position ? options.position : this.getDefaultPosition();
		if (options.customCss) {
			this.customCss = options.customCss;
		} else {
			this.customCss = 'popup';
		}
		if (options.content)
			this.popupContentElement = this.getPopupContent(options.content);
	}
	createButtonElements() {
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
		this.createTitleElement(titleInnerHTML);
		this.createPopup();
	}

	createTitleElement(title) {
		this.titleElemet = new Component('h2', title, 'popup-title').element;
	}

	createButtonsWrapper() {
		return new Component('div', '', 'popup-buttons').element;
	}

	createPopup() {
		this.createButtonElements();
		const buttonsDiv = this.createButtonsWrapper();
		buttonsDiv.append(...this.buttonElements);
		this.popupElement.append(this.titleElemet);
		if (this.popupContentElement) this.popupElement.append(this.popupContentElement);
		this.popupElement.append(buttonsDiv);
		this.backdrop.append(this.popupElement);
	}

	show() {
		document.body.append(this.backdrop);
		this.revealAnimation(this.backdrop, this.popupElement);
	}

	hide() {
		this.hideAnimation(this.backdrop, this.popupElement);
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
		new Button(
			'Console',
			false,
			() => console.log('This button does nothing'),
			'custom'
		),
		new Button('Close', true, false),
	],
	position: 'middle',
	content: {
		elementType: 'div',
		innerHTML: cookiesText,
	},
});

//DO ZROBIENIA POSITION
//DO ZROBIENIA ANIMATION

blueprintPopup.show();
