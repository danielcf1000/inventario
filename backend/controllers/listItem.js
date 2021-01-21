const path = require('path');
const fs = require('fs').promises;

const items_path = path.join(__dirname, '../bbdd/items.json');

async function listItem(req, res, next) {
	try {
		const item_list = await JSON.parse(await fs.readFile(items_path));
		const queryStrings = req.query;

		let products = item_list.sort((a, b) => {
			if (a.name < b.name) return -1;
			if (a.name > b.name) return 1;
			return 0;
		});

		if (Object.entries(queryStrings).length > 0) {
			const { key, ref } = queryStrings;

			if (key.length > 0) {
				products = products.filter((product) => {
					return (
						product.name.toLowerCase().includes(key.toLowerCase()) ||
						product.brand.toLowerCase().includes(key.toLowerCase()) ||
						product.model.toLowerCase().includes(key.toLowerCase())
					);
				});
			}

			if (ref.length > 0) {
				products = products.filter((product) => {
					return product.ref.toLowerCase().includes(ref.toLowerCase());
				});
			}
		}

		const content = products.map((item) => {
			const { name, type, desc, ref, price } = item;
			return `<tr>
                <td>${name}</td>
                <td>${type}</td>
                <td>${desc}</td>
                <td>${ref}</td>
				<td class="size">${price}</td>
				<td><a href="./solicitar.html">Solicitar</a></td>
          </tr>`;
		});

		res.send({
			status: 'ok',
			data: content.join(''),
		});
	} catch (error) {
		next(error);
	}
}

module.exports = { listItem };
