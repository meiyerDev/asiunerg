import Api from '../Api'

async function reportAbsence(form){
  return Api.post('/estudiante/inasistencias/nueva',form)
}

async function dataFormAbsence(){
  return Api.get('/estudiante/inasistencias/materias')
}

async function getAbsences(page = ''){
	return Api.get(`/estudiante/inasistencias?page=${page}`)
}

async function deleteAbsence(id){
  return Api.delete(`/estudiante/inasistencias/${id}`)
}

async function getTeachersAbsences(page = '') {
	return Api.get(`/estudiante/inasistencias/profesores?page=${page}`)	
}

export default {
  reportAbsence,
  dataFormAbsence,
  getAbsences,
  deleteAbsence,
  getTeachersAbsences
}