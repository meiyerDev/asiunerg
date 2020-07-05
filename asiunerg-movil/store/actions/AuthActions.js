import Auth from '../../services/Auth/Auth'
import { createResponse } from '../../helpers/Response'
import { HasRoleStudent, HasRoleTeacher } from '../../helpers/Roles'
import * as SecureStore from 'expo-secure-store'
import * as Device from 'expo-device';
import Api from '../../services/Api'

export const signUpAction = (credentials,navigation) => {
	return (dispatch) => {
		dispatch({type:'RESTART_AUTH_RESPONSE'});
		dispatch({type:'AUTH_LOADING'});

		Auth.register(credentials)
		.then( resp => {
			const response = createResponse(resp) 
			dispatch({type:'SIGNUP_SUCCESS',response});
			navigation.push("Login")
			dispatch({type:'AUTH_LOADED'})
		})
		.catch(error => {
			console.log('error',error.response)
			if(error.response.status === 422){
				const message = error.response.data;
				console.log('error-message',message);
				dispatch({type:'SIGNUP_ERROR',message});
				dispatch({type:'ERROR_NOTIFICATION', payload: message.message})
				dispatch({type: 'CLEAR_NOTIFICATION'})
			}else{
				dispatch({type:'CODE_ERROR',error});
			}
			dispatch({type:'AUTH_LOADED'})
		})
	}
}

export const LoginAction = (credentials, navigation) => {

	return (dispatch) => {
		dispatch({type:'RESTART_AUTH_RESPONSE'});
		dispatch({type:'AUTH_LOADING'});
		
		Auth.login({
			...credentials,
			device_name: `${Device.productName}-${Device.designName}-${Device.brand}`
		})
		.then(resp => {
			const {
				role,
				token
			} = resp.data;

			SecureStore.setItemAsync('token',token);
			Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

			dispatch({type:'LOGIN_SUCCESS', payload: role});

			dispatch({type:'RESTART_AUTH_RESPONSE'}); 
			dispatch({type:'AUTH_LOADED'})
		})
		.catch(error=>{
			console.log('error',error)
			console.log('error-response',error.response.status)
			if(error.response.status === 422){
				const message = error.response.data;
				console.log('messages',message)
				dispatch({type:'LOGIN_ERROR',message})

				/* Notification */
				dispatch({type:'ERROR_NOTIFICATION', payload: message.message})
				dispatch({type: 'CLEAR_NOTIFICATION'})
				/* Notification */
			}else{
				dispatch({type:'CODE_ERROR',error});
			}
			dispatch({type:'AUTH_LOADED'})
		})
	}   
}

export const LogOutAction = (navigation) => {

	return (dispatch) => {
		dispatch({type:'RESTART_AUTH_RESPONSE'});
		dispatch({type:'AUTH_LOADING'});
		Auth.logout({
			device_name: `${Device.productName}-${Device.designName}-${Device.brand}`
		})
		.then(async resp => {
			const response = createResponse(resp)
			const token = await SecureStore.deleteItemAsync('token')
			dispatch({type:'LOGOUT_SUCCESS', payload: response});
			dispatch({type:'CLEAR_PROFILE'});
			dispatch({type:'ABSENCE_CLEAR'});
		})
		.catch(error => {
			console.log('error',error)
			if(error.response.status === 500){
				const message = error.response.data;
				dispatch({type:'LOGOUT_ERROR',message})
			}else{
				dispatch({type:'CODE_ERROR',error});
			}
		})
		dispatch({type:'AUTH_LOADED'})
	}
}

export const clearAuthState = () => {
  return (dispatch) => {
    dispatch({type:'RESTART_AUTH_RESPONSE'});
  }
}

export const isAuthAction = (role) => (dispatch) => {
	dispatch({type:'LOGIN_SUCCESS', payload: role});
	dispatch({type: 'AUTH_LOADED'})
}