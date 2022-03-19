import { Component } from './popup-lib-src/Component.js';
import { Attribute } from './popup-lib-src/Attribute.js';
import { Button } from './Button.js';
import { Config } from './Config.js';
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
