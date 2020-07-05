import Api from '../Api'

async function getClasses(page = '') {
	return Api.get(`/estudiante/clases/materias?page=${page}`)
}

async function getClass(id) {
	return Api.get(`/estudiante/clases/materia/${id}`)
}

export default {
	getClass,
	getClasses
}