import { format } from "src/utils/moment";

import { correctMaterial } from "./material.correct";

export const correctInventoryCheck = (data) => {
	data["value"] = 0;

	const _materials = data["materials"].map((material) => {
		data["value"] += material["warePrice"] * material["wareQ"];
		return correctMaterial(material);
	});

	return {
		id: data["id"],
		code: data["code"],
		value: data["value"],
		note: data["note"],
		checked: format(data["checked"], "yyyy-MM-DD"),
		createdBy: data["createdBy"],
		storeCode: data["storeCode"],
		wareCode: data["wareCode"],
		materials: _materials,
		groupCode: data["groupCode"]
	};
};
