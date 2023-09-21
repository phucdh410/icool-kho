export const correctGood = (data) => {
	let ex = [data.boughtEx, data.wareEx, 1];

	let quantity = [data["boughtQ"], data["wareQ"], data["quantity"]];

	let _index = quantity.findIndex((p) => !!p);

	for (let i = 0; i < 4; i++)
		quantity[i] = quantity[_index] * (ex[i] / ex[_index]);

	return {
		id: data["id"],
		code: data["code"],
		name: data["name"],

		boughtUnit: data["boughtUnit"],
		wareUnit: data["wareUnit"],
		unit: data["unit"],

		boughtQ: quantity[0],
		wareQ: quantity[1],
		quantity: quantity[2],

		boughtPrice: data["boughtPrice"],
		warePrice: data["warePrice"],
		price: data["price"],
	};
};
