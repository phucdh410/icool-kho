import { Ability, AbilityBuilder } from "@casl/ability";
import { subscribeAfter } from "redux-subscribe-action";

import { store } from "src/store";

import { ENTITY_GROUP_CODE, PERMISSION_VALUE } from "./constant";

export const ability = new Ability();

const defineRulesFor = ({
	user: { id },
	role,
	storeCode,
	wareCode,
	permissions,
}) => {
	const { can, rules } = new AbilityBuilder();

	Object.keys(PERMISSION_VALUE).forEach((key) =>
		can(PERMISSION_VALUE[key], ENTITY_GROUP_CODE.ALL)
	);

	Object.keys(permissions).forEach((_role) => {
		Object.keys(PERMISSION_VALUE).forEach(
			(key) =>
				(role === "OPERATOR" || PERMISSION_VALUE[key] & permissions[_role]) &&
				can(PERMISSION_VALUE[key], _role)
		);
	});

	return rules;
};

export const unsubscribe = subscribeAfter(
	({ type }) =>
		type === "SET_PERMISSION" &&
		ability.update(defineRulesFor(store.getState().auth))
);
