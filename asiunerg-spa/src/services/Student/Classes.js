import Api from 'services/Api'
import Csrf from 'services/Csrf'

async function getClasses(page = '') {
	await Csrf.getCookie()
	return Api.get(`/estudiante/clases/materias?page=${page}`)
}

async function getClass(id) {
	await Csrf.getCookie()
	return Api.get(`/estudiante/clases/materia/${id}`)
}

export default {
	getClass,
	getClasses
}