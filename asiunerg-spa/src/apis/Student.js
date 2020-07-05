import Api from './Api'
import Csrf from './Csrf'

async function postHorario(form){
	await Csrf.getCookie()
	return Api.post('/estudiante/inscribir/materias',form)
}

async function profile(form){
	await Csrf.getCookie()
	return Api.get('/estudiante/profile')
}

async function matters(id){
	await Csrf.getCookie()
	return Api.get(`/estudiante/${id}/materias`)
}

async function postAvatar(form){
	await Csrf.getCookie()
	return Api.post('/estudiante/cambiar/avatar',form)
}

export default {
	postHorario,
	profile,
	matters,
	postAvatar
}