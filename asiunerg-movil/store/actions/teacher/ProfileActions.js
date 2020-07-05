import Profile from '../../../services/Teacher/Profile'
import { createResponse } from '../../../helpers/Response'

export const profileAction = () => {
	return (dispatch) => {
		dispatch({type:'PROFILE_LOADING'});

		Profile.getData()
		.then(resp => {
			const response = createResponse(resp).data;
			dispatch({type:'PROFILE_DATA', payload: response.data});
		})
		.catch(error => {
			console.log(error.response);
			
			const message = error.response;
			dispatch({type:'PROFILE_ERROR', payload: message});
		})
		dispatch({type:'PROFILE_LOADED'});
	}
}

export const matterAssignAction = () => {
	return (dispatch) => {
		dispatch({type:'PROFILE_LOADING'});
		Profile.getMatterAssign()
		.then(resp => {
			const response = createResponse(resp).data
			dispatch({type: 'MATTER_LIST', payload: response.data.matters})
		})
		.catch(error => {
			const message = error.response;
			console.log(error)
			dispatch({type:'MATTER_LIST_ERROR', payload: message})
		})
		dispatch({type:'PROFILE_LOADED'});
	}
}

export const addPresentsProfile = (cant) => (dispatch) => {
	dispatch({type: 'PROFILE_ADD_PRESENTS', payload: cant})
}