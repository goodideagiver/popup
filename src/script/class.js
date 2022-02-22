class Style {}

class Attribute {
	constructor(id, value) {
		this.attrId = id;
		this.value = value;
	}
}
class Component {
	constructor(type, innerText, cssClasses, attributes) {
		this.initValues(type, innerText, cssClasses, attributes);
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
	constructor(closeOnClick = true, clickThrough = false) {
		this.closeOnClick = closeOnClick;
		this.clickThrough = clickThrough;
	}

	getBackdrop() {}
}
class Button extends Component {
	constructor(
		text = 'Ok',
		closeOnClick = true,
		callbackFunc = false,
		customCssClasses,
		customAttributes
	) {
		super('button', text, customCssClasses, customAttributes);
		this.getButton(closeOnClick, callbackFunc);
	}

	getButtonElement() {
		return this.element;
	}

	getButton(closeOnClick, callbackFunc) {
		this.closeOnClick = closeOnClick;
		this.callbackFunc = callbackFunc;
	}
}
class Position {}

class Config {
	constructor(options) {
		this.initOptions(options);
	}

	initOptions(options) {
		this.backdrop = options.backdrop ? options.backdrop : 'default backdrop option';
		this.buttons = options.buttons ? options.buttons : 'default buttons option';
		this.position = options.position ? options.position : 'default position option';
	}
}
class Popup extends Config {
	constructor(titleText, options) {
		//{buttons,backdropOptions,position,animation,[css classes]}} - options
		if (options) {
			super(options);
		}
	}

	generateCustomButtons() {}

	generateBackdrop() {}

	show() {}

	hide() {}
}

const component = new Component('button', 'ok', 'foo', new Attribute('id', 'bar'));

const component2 = new Component(
	'button',
	'ok',
	['foo', 'bar-class'],
	[new Attribute('id', 'siema'), new Attribute('disabled', 'false')]
);

console.log(component);
console.log(component2);
document.querySelector('#app').append(component.element, component2.element);

const popup1 = new Popup('Helllo', { backdrop: 'hi', buttons: [new Button('foo')] });
console.log(popup1);
