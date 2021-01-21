const form = document.querySelector('form');

form.addEventListener('submit', async function (e) {
	e.preventDefault();
	const formData = new FormData(this);
	const searchParams = new URLSearchParams(formData);

	const response = await fetch('http://localhost:4000/addUser', {
		method: 'post',
		body: searchParams,
	});
	const data = await response.json();

	if (data.status === 'error') {
		alert(data.message);
		setTimeout(() => {
			window.location.href = './solicitar.html';
		}, 300);
	} else {
		
		setTimeout(() => {
			window.location.href = './index.html';
		}, 300);
	}
});