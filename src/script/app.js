const buttonTop = document.getElementById('top');
const buttonMiddle = document.getElementById('middle');
const buttonBottom = document.getElementById('bottom');

buttonMiddle.addEventListener('click', () =>
	showModal(
		'Zgoda na pliki cookie i dane',
		`Na tej stronie używamy plików cookie i porównywalnych funkcji do przetwarzania informacji o urządzeniach końcowych i danych osobowych. Przetwarzanie ma na celu integracji treści, usług zewnętrznych i elementów podmiotów trzecich, analizie statystycznej/pomiarowej, spersonalizowanej reklamie oraz integracji mediów społecznościowych. W zależności od funkcji dane są przekazywane podmiotom trzecim i przez nie przetwarzane. Zgoda ta jest dobrowolna, nie jest wymagana do korzystania z naszej strony internetowej i można ją w każdej chwili odwołać za pomocą ikony w lewym dolnym rogu.`
	)
);
