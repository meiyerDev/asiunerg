import Absence from 'services/Student/Absence'
import { createResponse } from 'helpers/Response'
import {toastr} from 'react-redux-toastr'

export const reportAbsenceAction = (form) => {
	return (dispatch) => {
		dispatch({type:'ABSENCE_LOADING'})
		dispatch({type:'LOADING'})
		toastr.info('Espera un poco', 'Se está informando tu ausencia.');
		Absence.reportAbsence(form)
		.then(resp => {
			const response = createResponse(resp).data.data
			console.log(response)
			dispatch({type:'RESPONSE_MATTERS_TO_ABSENCES', payload: response})
			dispatch({type:'PROFILE_ADD_ABSENCE', payload: response.matters.length})
			dispatch({type:'ABSENCE_LOADED'})
			toastr.success('¡Estupendo!', 'Se ha informado con éxito tu ausencia.');
		})
		.catch(error => {
			const message = error.response
			dispatch({type:'MATTERS_TO_ABSENCES_ERROR', payload: message})
			dispatch({type:'ABSENCE_LOADED'})
			toastr.error('¡Oh no!', message.data.message)
		})
		dispatch({type:'LOADED'})
	}
}

export const matterToAbsencesAction = () => {
	return (dispatch) => {
		dispatch({type:'ABSENCE_LOADING'})
		dispatch({type:'LOADING'})
		toastr.info('Espera un poco', 'Se están cargando tus materias.');
		Absence.dataFormAbsence()
		.then(resp => {
			const response = createResponse(resp).data.data.inscriptions
			dispatch({type:'MATTERS_TO_ABSENCES', payload: response})
			dispatch({type:'ABSENCE_LOADED'})
			toastr.success('¡Listo!', 'Ya puedes proceder a informar tu ausencia.');
		})
		.catch(resp => {
			dispatch({type:'ABSENCE_LOADED'})
			toastr.error('¡Oh no!', resp.response.data.message);
		})
		dispatch({type:'LOADED'})		
	}
}

export const studentAbsencesAction = (number) => {
	return (dispatch) => {
		dispatch({type:'ABSENCE_LOADING'})
		dispatch({type:'LOADING'})
		toastr.info('Espera un poco', 'Se están cargando tus ausencias.');
		Absence.getAbsences(number)
		.then(resp => {
			const response = createResponse(resp).data
			dispatch({
				type:'ABSENCES_LIST',
				payload: response.data
			})
			dispatch({
				type:'ABSENCES_META_LINKS',
				payload: response.links
			})
			dispatch({type:'ABSENCE_LOADED'})
			toastr.success('¡Listo!', 'Ya puedes proceder a ver tus ausencia.');
		})
		.catch(error => {
			const message = error.response
			dispatch({type:'ABSENCES_LIST_ERROR', payload: message})
			dispatch({type:'ABSENCE_LOADED'})
			toastr.error('¡Oh no!', message.data.message);
		})
		dispatch({type:'LOADED'})		
	}
}

export const deleteAbsenceAction = (id) => {
	return (dispatch) => {
		dispatch({type:'ABSENCE_LOADING'})
		dispatch({type:'LOADING'})
		toastr.info('Espera un poco', 'Se está Eliminando el informe de tu ausencia.');
		Absence.deleteAbsence(id)
		.then(resp => {
			const response = createResponse(resp).data.data;
			const data = {
				id : id,
				matter : response
			}
			dispatch({
				type:'ABSENCE_DELETE',
				payload: data
			})
			dispatch({type:'PROFILE_DELETE_ABSENCE'})
			dispatch({type:'ABSENCE_LOADED'})
			toastr.success('¡Estupendo!', 'Se ha eliminado el informe de tu ausencia con éxito.');
		})
		.catch(error => {
			const message = error.response
			dispatch({
				type:'ABSENCES_LIST_ERROR',
				payload: message
			})
			dispatch({type:'ABSENCE_LOADED'})
			toastr.error('¡Oh no!', message.data.message)
		})
		dispatch({type:'LOADED'})		
	}
}

export const AbsenceTeacherListAction = () => {
	return (dispatch) => {
		toastr.info('Espera un poco', 'Se están cargando las ausencias de tus profesores.');
		Absence.getTeachersAbsences()
		.then(resp => {
			const response = createResponse(resp).data.data;
			dispatch({
				type: 'ABSENCE_THEIR_LIST',
				payload: response
			})
			dispatch({type:'ABSENCE_LOADED'})
			toastr.success('¡Listo!', 'Ya puedes proceder a ver sus ausencia.');
		})
		.catch(error => {
			console.log(error)
			dispatch({type:'ABSENCE_LOADED'})
			toastr.error('¡Oh no!', error.response.data.message)
		})
	}
}