import { correctGood } from "./good.correct";
import { correctMaterial } from "./material.correct";

export const correctPurchaseProposal = (data) => {
  data["total"] = 0;

  const _materials = data["materials"].map((material) => {
    const total = material["boughtPrice"] * material["boughtQ"];
    data["total"] += total;
    return { ...correctMaterial(material), total, note: material["note"] };
  });

  const _goods = data["goods"].map((good) => {
    const total = good["price"] * good["quantity"];
    data["total"] += total;
    return { ...correctGood(good), total, note: good["note"] };
  });

  return {
    id: data["id"],
    code: data["code"],
    total: data["total"],
    reason: data["reason"],
    store_code: data["store_code"],
    issueDate: data["issueDate"],
    materials: _materials,
    goods: _goods,
  };
};
