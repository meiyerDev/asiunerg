import Api from '../Api'

async function register(form) {
	return Api.post('/register',form)
}

async function login(form){
	return Api.post('/sanctum/token',form)
}

async function logout(form){
	return Api.post('/sanctum/logout',form)
}

async function auth(){
	return Api.get('/user')
}

async function getRole() {
	return Api.post('/user/role')
}

async function postRegion(form) {
	return Api.post('profesor/region', form)
}

export default {
	register,
	login,
	logout,
	auth,
	getRole,
	postRegion,
}
