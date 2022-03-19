import { Component } from './popup-lib-src/Component.js';

export class Backdrop extends Component {
	constructor(options = { closeOnClick: true, clickThrough: false }) {
		super('div', '', 'popupjs-backdrop');
		this.initOptions(options);
	}

	initOptions(options) {
		if (options.closeOnClick !== false)
			this.closeOnClick = true;
		if (options.clickThrough === true)
			this.element.style.pointerEvents = 'none';
		if (options.customCss)
			this.element.className = options.customCss;
	}

	getBackdropElement() {
		return this.element;
	}
}
