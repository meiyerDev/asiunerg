import Api from '../Api'

async function reportAbsence(form){
	return Api.post('/profesor/inasistencias/nueva',form)
}

async function dataFormAbsence(){
	return Api.get('/profesor/inasistencias/materias')
}

async function getAbsences(page = ''){
	return Api.get(`/profesor/inasistencias?page=${page}`)
}

async function deleteAbsence(id){
	return Api.delete(`/profesor/inasistencias/${id}`)
}

export default {
	reportAbsence,
	dataFormAbsence,
	getAbsences,
	deleteAbsence
}