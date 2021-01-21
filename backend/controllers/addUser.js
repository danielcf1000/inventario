const path = require('path');
const uuid = require('uuid');
const fs = require('fs').promises;

const users_path = path.join(__dirname, '../bbdd/users.json');

async function addUser(req, res, next) {
	try {
		const users_list = await JSON.parse(await fs.readFile(users_path));

		const {
			nombre,
			apellidos,
			tel,
			text,
		} = await req.body;

		console.log(nombre,
			apellidos,
			tel,
			text);
		if (!nombre) {
			const error = new Error('El nombre debe tener un nombre asignado.');
			error.httpStatus = 400;
			throw error;
		}

		if (!apellidos) {
			const error = new Error('El apellido debe tener un apellido asignado.');
			error.httpStatus = 400;
			throw error;
		}

		if (!tel) {
			const error = new Error('El numero de telefono por favor.');
			error.httpStatus = 400;
			throw error;
        }
        if (!text) {
			const error = new Error('Texto para trabajar ?.');
			error.httpStatus = 400;
			throw error;
		}

		

		const new_user = {
			id: uuid.v4(),
			nombre: nombre,
			apellidos: apellidos ? apellidos : 'S/N',
			tel: tel ? tel : 'S/N',
			text: text,
		};

		users_list.push(new_user);

		await fs.writeFile(users_path, JSON.stringify(users_list));

		res.send({
			status: 'ok',
			data: 'Mensaje recibido',
		});
	} catch (error) {
		next(error);
	}
}

module.exports = { addUser };
