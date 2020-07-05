import Api from 'services/Api'
import Csrf from 'services/Csrf'

async function getStudentsForMatter(id) {
	await Csrf.getCookie();
	return Api.get(`/profesor/clases/materia/${id}`)
}

async function newClassStudents(id, form) {
	await Csrf.getCookie();
	return Api.post(`/profesor/clases/materia/${id}/estudiantes`,form)
}

async function finishClassStudent(id, form) {
	await Csrf.getCookie();
	return Api.post(`/profesor/clases/materia/${id}/finalizar`,form)
}

export default {
	getStudentsForMatter,
	newClassStudents,
	finishClassStudent
}