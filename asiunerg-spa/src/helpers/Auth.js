export const isAuth = () => {
	if(localStorage.getItem('estudiante-token')) {
		return true;
	}
	if(localStorage.getItem('profesor-token')) {
		return true;
	}

	return false;
}