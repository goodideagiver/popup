import { Component } from './popup-lib-src/Component.js';

export class Button extends Component {
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
		if (callbackFunc)
			this.element.addEventListener('click', callbackFunc);
	}
}
