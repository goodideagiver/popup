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
		if (options.closeOnClick !== false) this.closeOnClick = true;
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
		this.initButton(closeOnClick, callbackFunc);
	}

	getButtonElement() {
		return this.element;
	}

	initButton(closeOnClick, callbackFunc) {
		this.closeOnClick = closeOnClick;
		this.callbackFunc = callbackFunc;
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
		zoomFade: `transform: scale(0.8); opacity: 0`,
		custom: 'custom css class',
		none: '',
	};

	getInlineStyle() {}

	constructor(options = { type: 'zoom' }) {
		this.optionsHandler(options);
		//zoom/fade/zoomFade
		//reveal animation false/zoom/fade/zoomFade
		//hide animation false/zoom/fade/zoomFade
	}

	typeOptionHandler(type) {
		if (!type) return;

		switch (type) {
			case 'zoom':
				this.selectedAnimationType = this.animationType.zoom;
				break;
			case 'fade':
				this.selectedAnimationType = this.animationType.fade;
				break;
			case 'zoomFade':
				this.selectedAnimationType = this.animationType.zoomFade;
				break;
			case 'none':
				this.selectedAnimationType = this.animationType.none;
				this.duration = {
					reveal: 0,
					hide: 0,
				};
				break;
			default:
				throw 'Invalid animation type';
				break;
		}
	}

	durationOptionHandler(options) {
		if (options && options.duration) {
			if (options.duration.reveal && options.duration.hide) {
				this.duration.reveal = options.duration.reveal;
				this.duration.hide = options.duration.hide;
			} else {
				throw 'You need to specify duration hide and duration reveal';
			}
		}
	}

	optionsHandler(options) {
		this.typeOptionHandler(options.type);
		this.durationOptionHandler(options);
	}

	revealAnimation(backdrop, popup) {
		backdrop.style = `opacity: 0; transition: ${this.duration.reveal}s`;
		popup.style = `${this.selectedAnimationType}; transition: ${this.duration.reveal}s`;
		setTimeout(() => {
			backdrop.style = `transition: ${this.duration.reveal}s`;
			popup.style = `transition: ${this.duration.reveal}s`;
		}, 1);
	}

	hideAnimation(backdrop, popup) {
		backdrop.style = `opacity: 0; transition: ${this.duration.hide}s; pointer-events: none;`;
		popup.style = `${this.selectedAnimationType}; transition: ${this.duration.hide}s`;
		setTimeout(() => {
			backdrop.remove();
		}, this.duration.hide * 1000);
	}
}
class Config extends CustomAnimation {
	constructor(options) {
		super(options.animation);
		this.initOptions(options);
	}

	getDefaultButton() {
		return new Button('Ok', true, false, 'popup-button-default');
	}

	generateButtonElements() {
		this.buttonElements = [];
		this.buttons.forEach(button => {
			this.buttonElements.push(button.element);
		});
	}

	getDefaultPosition() {
		return 'middle';
	}

	getCustomBackdrop(backdropOptions) {
		this.customBackdrop = new Backdrop(backdropOptions);
		return this.customBackdrop.getBackdropElement();
	}

	createInnerPopupContentElement(options) {
		return new Component(
			options.elementType,
			options.innerHTML,
			options.customCss,
			options.attributes
		).element;
	}

	createMainPopupElement(options) {
		const customCSS = options.customCss ? options.customCss : 'popup';
		this.popup = new Component('div', '', customCSS);
		this.popupElement = this.popup.element;
	}

	positionOptionsHandler(options) {
		if (options.position) {
			switch (options.position) {
				case 'top':
					this.backdrop.style = 'align-items: baseline';
					break;
				case 'bottom':
					this.backdrop.style = 'align-items: end';
					break;
				case 'middle':
					break;

				default:
					break;
			}
		}
	}
	CSSOptionHandler(options) {
		if (options.customCss) {
			this.customCss = options.customCss;
		} else {
			this.customCss = 'popup';
		}
	}

	innerContentOptionsHandler(options) {
		if (options.content) {
			this.popupContentElement = this.createInnerPopupContentElement(
				options.content
			);
		}
	}

	backdropOptionsHandler(options) {
		this.backdrop = options.backdrop
			? this.getCustomBackdrop(options.backdrop)
			: new Backdrop().getBackdropElement();
	}

	buttonOptionsHandler(options) {
		this.buttons = options.buttons ? options.buttons : [this.getDefaultButton()];
	}

	initOptions(options) {
		this.createMainPopupElement(options);
		this.backdropOptionsHandler(options);
		this.buttonOptionsHandler(options);
		this.CSSOptionHandler(options);
		this.innerContentOptionsHandler(options);
		this.positionOptionsHandler(options);
	}
}
class Popup extends Config {
	constructor(titleInnerHTML, options = {}) {
		//{buttons,backdropOptions,position,animation,[css classes]}} - options
		super(options);
		this.createTitleElement(titleInnerHTML);
		this.generatePopupElement();
	}

	createTitleElement(title) {
		this.titleElemet = new Component('h2', title, 'popup-title').element;
	}

	createButtonsWrapperElement() {
		return new Component('div', '', 'popup-buttons').element;
	}

	addBackdropCloseEvent() {
		if (this.customBackdrop && this.customBackdrop.closeOnClick)
			this.backdrop.addEventListener('click', e => {
				if (e.target === this.backdrop) this.hide();
			});
	}

	addButtonCloseEvent() {
		if (this.buttons) {
			this.buttons
				.filter(button => button.closeOnClick === true)
				.forEach(button =>
					button.element.addEventListener('click', () => this.hide())
				);
		}
	}

	popupContentsJoin() {
		const buttonsDiv = this.createButtonsWrapperElement();
		buttonsDiv.append(...this.buttonElements);
		this.popupElement.append(this.titleElemet);
		if (this.popupContentElement) this.popupElement.append(this.popupContentElement);
		this.popupElement.append(buttonsDiv);
	}

	addPopupToWrappers() {
		this.backdrop.append(this.popupElement);
		this.wrapperElement = new Component('div', '').element;
		this.wrapperElement.append(this.backdrop);
	}

	generatePopupElement() {
		this.addBackdropCloseEvent();
		this.addButtonCloseEvent();
		this.generateButtonElements();
		this.popupContentsJoin();
		this.addPopupToWrappers();
	}

	show() {
		document.body.append(this.wrapperElement);
		this.revealAnimation(this.wrapperElement, this.popupElement);
	}

	hide() {
		this.hideAnimation(this.wrapperElement, this.popupElement);
	}
}

const cookiesText =
	'Cookies are small text files that websites place on the computers and mobile devices of people who visit those websites.';

const blueprintPopup = new Popup('What are Cookies?', {
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
		new Button('Close2', true, false),
	],
	position: 'top',
	content: {
		elementType: 'div',
		innerHTML: cookiesText,
		attributes: [new Attribute('id', 'foobar'), new Attribute('data', 'hello')],
	},
	animation: {
		type: 'zoomFade',
	},
});
