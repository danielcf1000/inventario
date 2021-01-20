const path = require('path');
const uuid = require('uuid');
const fs = require('fs').promises;

const items_path = path.join(__dirname, '../bbdd/items.json');

async function addItem(req, res, next) {
	try {
		const item_list = await JSON.parse(await fs.readFile(items_path));

		const {
			name,
			type,
			desc,
			ref,
			price,
		} = await req.body;

		if (!name) {
			const error = new Error('El servicio debe tener un nombre asignado.');
			error.httpStatus = 400;
			throw error;
		}

		if (!price) {
			const error = new Error('Debes ponerle un precio al servicio.');
			error.httpStatus = 400;
			throw error;
		}

		if (!ref) {
			const error = new Error('La referencia es obligatoria.');
			error.httpStatus = 400;
			throw error;
		}

		for (const item of item_list) {
			if (
				(item.name === name && item.type === type && item.desc === desc) ||
				item.ref === ref
			) {
				const error = new Error('El producto ya existe.');
				error.httpStatus = 409;
				throw error;
			}
		}

		const new_item = {
			id: uuid.v4(),
			name: name,
			type: type ? type : 'S/N',
			desc: desc ? desc : 'S/N',
			price: price,
			ref: ref,
		};

		item_list.push(new_item);

		await fs.writeFile(items_path, JSON.stringify(item_list));

		res.send({
			status: 'ok',
			data: 'Mensaje recibido',
		});
	} catch (error) {
		next(error);
	}
}

module.exports = { addItem };
