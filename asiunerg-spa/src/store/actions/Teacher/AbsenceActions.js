import Absence from 'services/Teacher/Absence'
import { createResponse } from 'helpers/Response'
import {toastr} from 'react-redux-toastr'

export const matterToAbsencesAction = () => {
	return (dispatch) => {
		dispatch({type:'ABSENCE_LOADING'})
		toastr.info('Espera un poco', 'Se están cargando tus materias.');
		Absence.dataFormAbsence()
		.then(resp => {
			const response = createResponse(resp).data.data.matters
			dispatch({type:'MATTERS_TO_ABSENCES', payload: response})
			toastr.success('¡Listo!', 'Ya puedes proceder a informar tu ausencia.');
			dispatch({type:'ABSENCE_LOADED'})
		})
		.catch(resp => {
			dispatch({type:'ABSENCE_LOADED'})
			toastr.error('¡Oh no!', resp.response.data.message);
		})
	}
}

export const reportAbsenceAction = (form) => {
	return (dispatch) => {
		dispatch({type:'ABSENCE_LOADING'})
		dispatch({type:'LOADING'})
		toastr.info('Espera un poco', 'Se está informando tu ausencia.');
		Absence.reportAbsence(form)
		.then(resp => {
			const response = createResponse(resp).data.data
			dispatch({type:'RESPONSE_MATTERS_TO_ABSENCES', payload: response})
			dispatch({type:'ABSENCE_LOADED'})
			toastr.success('¡Estupendo!', 'Se ha informado con éxito tu ausencia.');
		})
		.catch(error => {
			const message = error.response
			console.log(message)
			toastr.error('¡Oh no!', message.data.message)
			dispatch({type:'ABSENCE_LOADED'})
		})
		dispatch({type:'LOADED'})		
	}
}

export const absencesAction = (number) => {
	return (dispatch) => {
		dispatch({type:'LOADING'})
		dispatch({type:'ABSENCE_LOADING'})
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
		})
		.catch(error => {
			const message = error.response
			dispatch({type:'ABSENCES_LIST_ERROR', payload: message})
			toastr.error('¡Oh no!', message.data.message)
			dispatch({type:'ABSENCE_LOADED'})
		})
		dispatch({type:'LOADED'})		
	}
}

export const deleteAbsenceAction = (id) => {
	return (dispatch) => {
		dispatch({type:'LOADING'})
		dispatch({type:'ABSENCE_LOADING'})
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