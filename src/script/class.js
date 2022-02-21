class Style {}

class Attribute {
	constructor(id, value) {
		this.attrId = id;
		this.value = value;
	}
}
class Component {
	constructor(text, cssClass, [id, value]) {}
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
class Popup {
	constructor(title = 'Default title', subText = false, options) {
		//{buttons,backdropOptions,position,animation,[css classes]}} - options
		this.render();
	}

	render() {}
}
