const form = document.querySelector('form');
const tbody = document.querySelector('tbody');

async function listItems() {
	const response = await fetch('http://localhost:3000/');
	const { data } = await response.json();
	tbody.innerHTML = data;
}

listItems();

form.addEventListener('submit', async function (e) {
	e.preventDefault();

	const url = new URL('http://localhost:3000/');
	const inputs = form.elements;
	const params = {
		key: inputs[1].value,
		ref: inputs[3].value,
	};

	url.search = new URLSearchParams(params).toString();

	const response = await fetch(url, {
		method: 'get',
	});
	const { data } = await response.json();

	inputs[1].value = '';
	inputs[3].value = '';

	tbody.innerHTML = data;
});
