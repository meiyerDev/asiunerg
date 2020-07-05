import Absence from '../../../services/Student/Absence'
import { createResponse } from '../../../helpers/Response'

export const reportAbsenceAction = (form, posFunction) => {
	return (dispatch) => {
		dispatch({type:'LOADING'})
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
			const message = error
			console.log('error:',message)
			dispatch({type:'MATTERS_TO_ABSENCES_ERROR', payload: message})
			dispatch({type:'ABSENCE_LOADED'})
		})
		dispatch({type:'LOADED'})		
	}
}

export const matterToAbsencesAction = () => {
	return (dispatch) => {
		dispatch({type:'LOADING'})
		dispatch({type:'ABSENCE_LOADING'})
		Absence.dataFormAbsence()
		.then(resp => {
			const response = createResponse(resp).data.data.inscriptions
			dispatch({type:'MATTERS_TO_ABSENCES', payload: response})
			dispatch({type:'ABSENCE_LOADED'})
		})
		.catch(resp => {
			dispatch({type:'ABSENCE_LOADED'})
		})
		dispatch({type:'LOADED'})		
	}
}

export const studentAbsencesAction = (number) => {
	return (dispatch) => {
		dispatch({type:'ABSENCE_LOADING'})
		dispatch({type:'LOADING'})
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
			const message = error
			dispatch({type:'ABSENCES_LIST_ERROR', payload: message})
			dispatch({type:'ABSENCE_LOADED'})
		})
		dispatch({type:'LOADED'})		
	}
}

export const deleteAbsenceAction = (id) => {
	return (dispatch) => {
		dispatch({type:'LOADING'})
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
			dispatch({type:'ABSENCE_LOADED'})
		})
		.catch(error => {
			const message = error
			dispatch({
				type:'ABSENCES_LIST_ERROR',
				payload: message
			})
			dispatch({type:'ABSENCE_LOADED'})
		})
		dispatch({type:'LOADED'})		
	}
}

export const AbsenceTeacherListAction = (number) => {
	return (dispatch) => {
		dispatch({type:'ABSENCE_LOADING'})
		Absence.getTeachersAbsences(number)
		.then(resp => {
			const response = createResponse(resp).data;
			if (number !== undefined) {
				dispatch({type:'ABSENCES_THEIR_LIST_ADD', payload: response.data})
			}else{
				dispatch({
					type:'ABSENCE_THEIR_LIST',
					payload: response.data
				})
			}
			dispatch({
				type:'ABSENCES_THEIR_META_LINKS',
				payload: {
					current_page: response.meta.current_page,
					last_page: response.meta.last_page
				}
			})
			dispatch({type:'ABSENCE_LOADED'})
		})
		.catch(error => {
			console.log(error)
			dispatch({type:'ABSENCE_LOADED'})
		})
	}
}