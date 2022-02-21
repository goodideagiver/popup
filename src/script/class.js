class Style {}

class Config {}
class Attribute {
	constructor(id, value) {
		this.attrId = id;
		this.value = value;
	}
}
class Component {
	constructor(type, text, cssClasses, attributes) {
		this.initValues(type, text, cssClasses, attributes);
	}

	initValues(type, text, cssClasses, attributes) {
		if (!type || type === '') {
			throw 'cannot create element without type';
		} else {
			this.type = type;
			this.element = this.getTypedElement();
		}
		if (text) {
			this.text = text;
			this.element.innerHTML = this.text;
		}
		if (cssClasses) {
			this.cssClass = Array.isArray(cssClasses) ? [...cssClasses] : [cssClasses];
			this.addClassesToElement(this.element, this.cssClass);
		}
		if (attributes) {
			this.attributes = Array.isArray(attributes) ? [...attributes] : [attributes];
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
class Animation {}
class Backdrop extends Component {
	constructor(closeOnClick = true, ClickThrough = false) {
		this.closeOnClick = closeOnClick;
		this.clickThrough = this.clickThrough;
	}

	getBackdrop() {}
}
class Button extends Component {
	constructor(text = 'Ok', closeOnClick = true, callbackFunc = false) {
		this.getButton();
	}

	getButton() {}
}
class Position {}
class Popup extends Config {
	constructor(title = 'Default title', subText = false, options) {
		//{buttons,backdropOptions,position,animation,[css classes]}} - options
		this.render();
	}

	render() {}
}

const component = new Component('button', 'ok', 'foo', new Attribute('id', 'bar'))
	.element;

const component2 = new Component(
	'button',
	'ok',
	['foo', 'bar-class'],
	[new Attribute('id', 'siema'), new Attribute('disabled', 'false')]
).element;

console.log(component);
console.log(component2);
document.body.append(component, component2);
