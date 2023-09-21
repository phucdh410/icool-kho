export const correctPermission = (
	role,
	users,
	permissions,
	groups,
	reports
) => {
	let _groups = groups?.length
		? groups.reduce((t, g) => ({ ...t, [g.actions]: g.value }), {})
		: groups;

	return {
		id: role["id"],
		code: role["code"],
		name: role["name"],

		users: users.map((u) => u.code),
		groups: _groups,
		permissions: { ...permissions, ...reports },
	};
};
