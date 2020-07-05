import Api from 'services/Api'
import Csrf from 'services/Csrf'

async function postHorario(form){
	await Csrf.getCookie()
	return Api.post('/estudiante/inscribir/materias',form)
}

async function getData(form){
	await Csrf.getCookie()
	return Api.get('/estudiante/profile')
}

async function getMatters(id){
	await Csrf.getCookie()
	return Api.get(`/estudiante/materias`)
}

async function getPeriodActive(){
	await Csrf.getCookie()
	return Api.get('/estudiante/activos/periodo')
}

export default {
	getPeriodActive,
	postHorario,
	getMatters,
	getData,
}