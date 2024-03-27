/* eslint-disable eqeqeq */
const word_unit = ["nghìn", "triệu", "tỷ"],
	word = [
		"không",
		"một",
		"hai",
		"ba",
		"bốn",
		"năm",
		"sáu",
		"bảy",
		"tám",
		"chín",
	],
	spell_group_of_2 = (r, e) => {
		let t = "";
		if ("0" === r && "0" === e) return "";
		switch (r) {
			case "0":
				t = "lẻ";
				break;
			case "1":
				t = "mười";
				break;
			default:
				t = `${word[r]} mươi`;
		}
		switch (e) {
			case "0":
				return t;
			case "1":
				return `${t} ${"1" === r || "0" === r ? "một" : "mốt"}`;
			case "5":
				return `${t} ${"0" === r ? "năm" : "lăm"}`;
			default:
				return `${t} ${word[e]}`;
		}
	},
	spell_group_of_3 = (r, e) => {
		let [t, o, l] = r.split("");
		return void 0 === o
			? word[t]
			: void 0 === l
			? spell_group_of_2(o, t)
			: `${
					"0" === l && e ? "không trăm" : `${word[l]} trăm`
			  } ${spell_group_of_2(o, t)}`;
	};
export const spell = (r) => {
	let e = [],
		t = r < 0,
		o = ("" + (r *= t || -1))
			.split("")
			.reverse()
			.join("")
			.match(/\d{1,3}/g);
	return (
		o.forEach(
			(r, t) =>
				"000" != r &&
				e.push(
					spell_group_of_3("" + r, t !== o.length - 1) +
						(0 != t ? ` ${word_unit[(t - 1) % 3]}` : "")
				)
		),
		(t ? "âm " : "") + e.reverse().join(" ")
	);
};
