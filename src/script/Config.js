import { Component } from './popup-lib-src/Component.js';
import { Backdrop } from './Backdrop.js';
import { Button } from './Button.js';
import { CustomAnimation } from './CustomAnimation.js';

export class Config extends CustomAnimation {
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
