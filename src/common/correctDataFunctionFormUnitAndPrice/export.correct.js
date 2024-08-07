import { format } from "src/utils/moment";

import { correctMaterial } from "./material.correct";

export const correctExport = (data) => {
  data["total"] = 0;

  const _materials = data["materials"].map((material) => {
    const total = material["boughtPrice"] * material["boughtQ"];
    data["total"] += total;
    return {
      ...correctMaterial(material),
      total,
      sum: total,
      price: material["boughtPrice"],
    };
  });

  return {
    id: data["id"],
    code: data["code"],
    total: data["total"],
    sum: data["total"],
    note: data["note"],
    date: format(data["date"], "yyyy-MM-DD"),
    store_code: data["store_code"],
    materials: _materials,
  };
};
