export const correctMaterial = (data) => {
	let ex = [data.providerEx, data.boughtEx, data.wareEx, 1];

	let quantity = [
		data["providerQ"],
		data["boughtQ"],
		data["wareQ"],
		data["quantity"],
	];

	let _index = quantity.findIndex((p) => !!p);

	for (let i = 0; i < 4; i++)
		quantity[i] = quantity[_index] * (ex[_index] / ex[i]);

	return {
		id: data["id"],
		code: data["code"],
		name: data["name"],

		providerUnit: data["providerUnit"],
		boughtUnit: data["boughtUnit"],
		wareUnit: data["wareUnit"],
		unit: data["unit"],

		providerQ: quantity[0],
		boughtQ: quantity[1],
		wareQ: quantity[2],
		quantity: quantity[2],

		providerPrice: data["providerPrice"],
		boughtPrice: data["boughtPrice"],
		warePrice: data["warePrice"],
		price: data["price"],
	};
};
