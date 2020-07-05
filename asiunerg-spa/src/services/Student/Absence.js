import Api from 'services/Api'
import Csrf from 'services/Csrf'

async function reportAbsence(form){
	await Csrf.getCookie()
	return Api.post('/estudiante/inasistencias/nueva',form)
}

async function dataFormAbsence(){
	await Csrf.getCookie()
	return Api.get('/estudiante/inasistencias/materias')
}

async function getAbsences(page = ''){
	await Csrf.getCookie()
	return Api.get(`/estudiante/inasistencias?page=${page}`)
}

async function deleteAbsence(id){
	await Csrf.getCookie()
	return Api.delete(`/estudiante/inasistencias/${id}`)
}

async function getTeachersAbsences() {
	await Csrf.getCookie()
	return Api.get('/estudiante/inasistencias/profesores')	
}

export default {
	reportAbsence,
	dataFormAbsence,
	getAbsences,
	deleteAbsence,
	getTeachersAbsences
}