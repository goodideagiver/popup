export const getInputElements = (title, popupOptions) => {
	const elements = [];
	const titleEl = `new Popup('${title}',{`;
	elements.push(titleEl);

	if (popupOptions) {
		if (popupOptions.content) {
			const contentStart = `content: {`;
			const contentElType = `elementType: 'div',`;
			const contentElText = `innerHTML: '${popupOptions.content}',`;
			const contentEnd = `},`;
			elements.push(contentStart, contentElType, contentElText, contentEnd);
		}
		if (popupOptions.animation) {
			const contentStart = `animation: {`;
			const type = `type: '${popupOptions.animation.type}',`;
			const reveal = `reveal: ${popupOptions.reveal},`;
			const hide = `hide: ${popupOptions.hide},`;
			const contentEnd = `},`;
			elements.push(contentStart, type, reveal, hide, contentEnd);
		}
		if (popupOptions.backdrop) {
			const contentStart = `backdrop: {`;
			const clickThrough = `clickThrough: ${popupOptions.backdrop.clickThrough},`;
			const closeOnClick = `closeOnClick: ${popupOptions.backdrop.closeOnClick},`;
			const CSS = `customCss: '${popupOptions.backdrop.customCss}',`;
			const contentEnd = `},`;
			elements.push(contentStart, clickThrough, closeOnClick, contentEnd);
		}
		if (popupOptions.customCss) {
			const customCss = `customCss: '${popupOptions.customCss},'`;
			elements.push(customCss);
		}
		if (popupOptions.position) {
			const position = `position: '${popupOptions.position}',`;
			elements.push(position);
		}
		if (popupOptions.buttons && popupOptions.buttons.length > 0) {
			const buttonArr = popupOptions.buttons;
			const parsedButtons = [];
			buttonArr.forEach(button => {
				const buttonStart = `new Button('${button[0]}',${button[1]}`;
				if (button[2]) {
					const fallback = `,${button[2]}),`;
				} else {
					const fallback = `,false),`;
				}
				parsedButtons.push(buttonStart + fallback);
			});
			elements.push(parsedButtons);
		}
	}
	const closingBracket = `}`;
	elements.push(closingBracket);
	console.log(elements);
};
