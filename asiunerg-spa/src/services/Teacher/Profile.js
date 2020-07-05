import Api from 'services/Api'
import Csrf from 'services/Csrf'

async function getData(form){
	await Csrf.getCookie()
	return Api.get('/profesor/profile')
}

async function getMatterAssign() {
	await Csrf.getCookie()
	return Api.get('/profesor/materias/asignadas')
}

async function getPeriodActive(){
	await Csrf.getCookie()
	return Api.get('/profesor/activos/periodo')
}

export default {
	getData,
	getMatterAssign,
	getPeriodActive
}