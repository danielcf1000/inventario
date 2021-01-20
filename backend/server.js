require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { addItem, listItem } = require('./controllers');

const { PORT } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, 'static')));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', listItem);

app.post('/add', addItem);

app.use((error, req, res, next) => {
	console.error(error);
	res.status(error.httpStatus || 500).send({
		status: 'error',
		message: error.message,
	});
});

app.use((req, res) => {
	res.status(404).send({
		status: 'error',
		message: 'Not found',
	});
});

app.listen(PORT, () => {
	console.log(`Server working at port http://localhost:${PORT}`);
});
