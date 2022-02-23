# popup.js
This is my first ever OOP project.

[Demo](https://goodideagiver.github.io/popup/)

popup.js is a JavaScript library for dealing with creating popups fast.

## Installation

Download popup.js file and link it to your HTML file.
```html
<script defer src="popup.js"></script>
```

### Custom CSS
I recommend you to download `popup.scss` or `popup.min.css` it has build in CSS classes which are used by default by this library. If you don't download the CSS you will need to setup it yourself so popups can show properly.

## Usage

### Basic command example
The fastest way to use popup.js
```javascript
new Popup('Hello world').show()
```
### Use every option example
```javascript
const blueprintPopup = new Popup('What are Cookies?', {
	customCss: 'myCustomCssClass popup',
	backdrop: {
		customCss: 'myCustomCssClassForBackdrop popupjs-backdrop',
	},
	buttons: [
		new Button(
			'Console', //button innerHTML
			false,  //close popup on click
			() => console.log('This button does nothing'), //callback function
			'custom' //custom CSS class
		),
		new Button('Close', true, false),
		new Button('Close2', true, false),
	],
	position: 'top', //top|middle|bottom - this is alignment of the popup window
	content: { //inner content of the popup window, it creates new custom element
		elementType: 'div', //type of created element *required
		innerHTML: 'Cookies are small text files', //innerHTML of created element
        customCss: 'customCSS-class',
        attributes: [new Attribute('id', 'foobar'), new Attribute('data', 'hello')], //custom attributes
	},
	animation: {
		type: 'zoomFade', //zoom|zoomFade|fade|none
	},
});
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
I don't know
