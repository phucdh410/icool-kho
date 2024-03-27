const { aliasesOptions } = require("react-app-rewire-aliases");
const { paths } = require("react-app-rewired");
const { resolve } = require("path");

/* config-overrides.js */
module.exports = function override(config, env) {
	const _dir = (_path = "")  => resolve(__dirname, `${paths.appSrc}/${_path}`)
	config = aliasesOptions({
		src: _dir(),
		"_configs": _dir("configs"),
		"_utils": _dir(`utils`),
		"_common": _dir(`common`),
		"_components": _dir(`common/components`),
		"_modules": _dir(`modules`),
		"_models": _dir(`utils/models`),
		"_assets": _dir(`common/assets`),
	})(config, env);
	return config;
};
