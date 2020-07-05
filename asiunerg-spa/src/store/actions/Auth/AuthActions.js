import Auth from 'services/Auth/Auth'
import { createResponse } from 'helpers/Response'
import { HasRoleStudent, HasRoleTeacher } from 'helpers/Roles'
import {toastr} from 'react-redux-toastr'

export const signUpAction = (credentials,props) => {
	return (dispatch) => {
		dispatch({type:'RESTART_AUTH_RESPONSE'});
		dispatch({type:'AUTH_LOADING'});
		
		toastr.info('Espera un poco', 'Estás siendo registrado.');
		Auth.register(credentials)
		.then( resp => {
			const response = createResponse(resp) 
			dispatch({type:'SIGNUP_SUCCESS',response});
			props.history.push("/acceder")
			dispatch({type:'AUTH_LOADED'})
			toastr.success('¡Estupendo!', 'Te has registrado con éxito.');
		})
		.catch(error => {
			console.log('error',error.response)
			if(error.response.status === 422){
				const message = error.response.data;
				console.log('error',message);
				dispatch({type:'SIGNUP_ERROR',message});
			}else{
				dispatch({type:'CODE_ERROR',error});
			}
			dispatch({type:'AUTH_LOADED'})
		})
	}
}

export const LoginAction = (credentials,props) => {

	return (dispatch)=>{
		dispatch({type:'RESTART_AUTH_RESPONSE'});
		dispatch({type:'AUTH_LOADING'});
		
		Auth.login(credentials)
		.then(resp => {
			const {
				role,
				token
			} = resp.data;

			if(HasRoleStudent(role[0])) {
				localStorage.setItem('estudiante-token',token);
			}else if(HasRoleTeacher(role[0])) {
				localStorage.setItem('profesor-token',token);
			}

			dispatch({type:'LOGIN_SUCCESS',role});

			if(HasRoleStudent(role[0])){
				props.history.push("/estudiante");  
			}

			dispatch({type:'RESTART_AUTH_RESPONSE'}); 
			dispatch({type:'AUTH_LOADED'})
		})
		.catch(error=>{
			console.log('error',error.response)
			if(error.response.status === 422){
				const message = error.response.data;
				dispatch({type:'LOGIN_ERROR',message})
			}else{
				dispatch({type:'CODE_ERROR',error});
			}
			console.log(error)
			dispatch({type:'AUTH_LOADED'})
		})
	}   
}

export const LogOutAction = (props) => {

	return (dispatch)=>{
		dispatch({type:'RESTART_AUTH_RESPONSE'});
		dispatch({type:'AUTH_LOADING'});
		
		Auth.logout()
		.then(resp => {
			const response = createResponse(resp)

			localStorage.removeItem('estudiante-token')
			localStorage.removeItem('profesor-token')

			dispatch({type:'LOGOUT_SUCCESS',response});
			dispatch({type:'ABSENCE_RESTORE_DATA'});
			dispatch({type:'PROFILE_RESTORE_DATA'});
			dispatch({type:'AUTH_LOADED'})
		})
		.catch(error => {
			console.log('error',error)
			if(error.response.status === 500){
				const message = error.response.data;
				dispatch({type:'LOGOUT_ERROR',message})
			}else{
				dispatch({type:'CODE_ERROR',error});
			}
			console.log(error)
			dispatch({type:'AUTH_LOADED'})
		})
	}
}

export const clearAuthState = () => {
  return (dispatch) => {
    dispatch({type:'RESTART_AUTH_RESPONSE'});
  }
}

export const checkAuth = () => {
	return (dispatch) => {
		Auth.getRole()
		.then(resp => {
			const { role } = createResponse(resp).data;
			dispatch({type:'LOGIN_SUCCESS',role});
		})
		.catch(error => {
			if(error.response.status === 401){
				const response = "";
				localStorage.removeItem('estudiante-token')
				localStorage.removeItem('profesor-token')
				dispatch({type:'LOGOUT_SUCCESS',response});
			}else{
				// Informar de error 500
			}
			console.log(error)
		})
	}
}
