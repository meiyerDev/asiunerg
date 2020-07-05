import Api from 'services/Api'
import Csrf from 'services/Csrf'

async function register(form) {
	await Csrf.getCookie()
	return Api.post('/register',form)
}

async function login(form){
	await Csrf.getCookie()
	return Api.post('/login',form)
}

async function logout(){
	await Csrf.getCookie()
	return Api.post('/logout')
}

async function auth(){
	await Csrf.getCookie()
	return Api.get('/user')
}

async function getRole() {
	await Csrf.getCookie()
	return Api.post('/user/role')
}

export default {
	register,
	login,
	logout,
	auth,
	getRole
}