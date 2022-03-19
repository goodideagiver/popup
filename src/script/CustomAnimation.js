export class CustomAnimation {
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

	getInlineStyle() { }

	constructor(options = { type: 'zoom' }) {
		this.optionsHandler(options);
		//zoom/fade/zoomFade
		//reveal animation false/zoom/fade/zoomFade
		//hide animation false/zoom/fade/zoomFade
	}

	typeOptionHandler(type) {
		if (!type)
			return;

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
