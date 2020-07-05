import Api from 'services/Api'
import Csrf from 'services/Csrf'

async function reportAbsence(form){
	await Csrf.getCookie()
	return Api.post('/profesor/inasistencias/nueva',form)
}

async function dataFormAbsence(){
	await Csrf.getCookie()
	return Api.get('/profesor/inasistencias/materias')
}

async function getAbsences(page = ''){
	await Csrf.getCookie()
	return Api.get(`/profesor/inasistencias?page=${page}`)
}

async function deleteAbsence(id){
	await Csrf.getCookie()
	return Api.delete(`/profesor/inasistencias/${id}`)
}

export default {
	reportAbsence,
	dataFormAbsence,
	getAbsences,
	deleteAbsence
}