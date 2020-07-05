import Api from '../Api'

async function postHorario(form){
	return Api.post('/estudiante/inscribir/materias',form,{
		'Content-Type': 'multipart/form-data',
	})
}

async function getData(form){
	return Api.get('/estudiante/profile')
}

async function getMatters(){
	return Api.get(`/estudiante/materias`)
}

async function postAvatar(form){
	return Api.post('/estudiante/cambiar/avatar',form, {
		'Content-Type': 'multipart/form-data',
	})
}

async function getPeriodActive(){
	return Api.get('/estudiante/activos/periodo')
}

export default {
	postHorario,
	getData,
	getMatters,
	postAvatar,
	getPeriodActive
}