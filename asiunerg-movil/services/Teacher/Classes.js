import Api from '../Api'

async function getStudentsForMatter(id) {
	return Api.get(`/profesor/clases/materia/${id}`)
}

async function newClassStudents(id, form) {
	return Api.post(`/profesor/clases/materia/${id}/estudiantes`,form)
}

async function finishClassStudent(id, form) {
	return Api.post(`/profesor/clases/materia/${id}/finalizar`,form)
}

export default {
	getStudentsForMatter,
	newClassStudents,
	finishClassStudent
}