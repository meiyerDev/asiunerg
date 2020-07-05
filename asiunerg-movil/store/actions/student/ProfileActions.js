import Profile from '../../../services/Student/Profile'
import { createResponse } from '../../../helpers/Response'

export const profileAction = () => {
	return (dispatch) => {
		dispatch({ type: 'PROFILE_LOADING' });

		Profile.getData()
			.then(resp => {
				const response = createResponse(resp).data;
				dispatch({ type: 'PROFILE_DATA', payload: response.data });
				dispatch({ type: 'PROFILE_LOADED' });
			})
			.catch(error => {
				console.log(error.response);

				const message = error.response;
				dispatch({ type: 'PROFILE_ERROR', payload: message });
				dispatch({ type: 'PROFILE_LOADED' });
			})
	}
}

export const mattersEnrolledAction = () => {
	return (dispatch) => {
		dispatch({ type: 'PROFILE_LOADING' });
		Profile.getMatters()
			.then(resp => {
				const response = createResponse(resp).data;
				dispatch({ type: 'MATTER_LIST', payload: response.data })
				dispatch({ type: 'PROFILE_LOADED' });
			})
			.catch(error => {
				const message = error.response;
				dispatch({ type: 'MATTER_LIST_ERROR', payload: message })
				dispatch({ type: 'PROFILE_LOADED' });
			})
	}
}