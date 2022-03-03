import {
	validate,
	addButtonDiv,
	getAnimationConfig,
	getButtonsConfig,
	getConfigObj,
} from './function.js';

import { elementsHook } from './hook.js';

validate();

elementsHook.popupTitle.addEventListener('input', validate);
elementsHook.addButton.addEventListener('click', () => {
	addButtonDiv();
	elementsHook.buttonContainer.classList.remove('hide-btn-container');
});
elementsHook.buttonContainerFold.addEventListener('click', () => {
	elementsHook.buttonContainer.classList.toggle('hide-btn-container');
});
elementsHook.form.addEventListener('input', e => {
	console.log(e.target.tagName);
	if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
		console.log(getConfigObj());
	}
});
elementsHook.form.addEventListener('click', e => {
	if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') {
		console.log(getConfigObj());
	}
});
