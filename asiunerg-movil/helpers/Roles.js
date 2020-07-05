export const HasRole = (roleUser, role) => {
	if(roleUser === role) {
		return true;
	} else {
		return false;
	}
}

export const HasRoleStudent = (roleUser) => {
	return HasRole(roleUser,'Student');
}

export const HasRoleTeacher = (roleUser) => {
	return HasRole(roleUser,'Teacher');
}