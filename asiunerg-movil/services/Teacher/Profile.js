import Api from '../Api'

async function getData(form){
	return Api.get('/profesor/profile')
}

async function getMatterAssign() {
	return Api.get('/profesor/materias/asignadas')
}

async function getPeriodActive(){
	return Api.get('/profesor/activos/periodo')
}

async function postAvatar(form){
	return Api.post('/profesor/cambiar/avatar',form, {
		'Content-Type': 'multipart/form-data',
	})
}

export default {
	getData,
	getMatterAssign,
	postAvatar,
	getPeriodActive
}