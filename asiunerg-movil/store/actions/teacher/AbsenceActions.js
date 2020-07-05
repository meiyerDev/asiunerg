import Absence from '../../../services/Teacher/Absence'
import { createResponse } from '../../../helpers/Response'

export const matterToAbsencesAction = () => {
	return (dispatch) => {
		Absence.dataFormAbsence()
		.then(resp => {
			const response = createResponse(resp).data.data.matters
			dispatch({type:'MATTERS_TO_ABSENCES', payload: response})
		})
		.catch(resp => {
		})
	}
}

export const reportAbsenceAction = (form, posFunction) => {
	return (dispatch) => {
		dispatch({type:'ABSENCE_LOADING'})
		Absence.reportAbsence(form)
		.then(resp => {
			const response = createResponse(resp).data.data
			dispatch({type:'RESPONSE_MATTERS_TO_ABSENCES', payload: response})
			dispatch({type:'PROFILE_ADD_ABSENCE', payload: response.matters.length})
			posFunction();

			/* Notification */
			dispatch({type:'SUCCESS_NOTIFICATION', payload: 'Inasistencia informada con éxito.'})
			dispatch({type: 'CLEAR_NOTIFICATION'})
			/* Notification */
			dispatch({type:'ABSENCE_LOADED'})		
		})
		.catch(error => {
			const message = error.response
			dispatch({type:'MATTERS_TO_ABSENCES_ERROR', payload: message})
			dispatch({type:'ABSENCE_LOADED'})		
		})
	}
}

export const absencesAction = (number) => {
	return (dispatch) => {
		dispatch({type:'ABSENCE_LOADING'})
		Absence.getAbsences(number)
		.then(resp => {
			const response = createResponse(resp).data
			if (number !== undefined) {
				dispatch({type:'ABSENCES_LIST_ADD', payload: response.data})
			}else{
				dispatch({
					type:'ABSENCES_LIST',
					payload: response.data
				})
			}
			dispatch({
				type:'ABSENCES_META_LINKS',
				payload: {
					current_page: response.meta.current_page,
					last_page: response.meta.last_page
				}
			})
			dispatch({type:'ABSENCE_LOADED'})		
		})
		.catch(error => {
			console.log(error)
			const message = error.response
			dispatch({type:'ABSENCES_LIST_ERROR', payload: message})
		})
	}
}

export const deleteAbsenceAction = (id) => {
	return (dispatch) => {
		dispatch({type:'ABSENCE_LOADING'})
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
		})
		.catch(error => {
			const message = error.response
			dispatch({
				type:'ABSENCES_LIST_ERROR',
				payload: message
			})
			dispatch({type:'ABSENCE_LOADED'})		
		})
	}
}