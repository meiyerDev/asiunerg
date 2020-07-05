import { isAuth } from 'helpers/Auth'

const authenticated = isAuth()

const initState = {
	authResponse: "",
	role: [],
	roleSelected: "",
	isAuth: authenticated,
	loading: false
}

export const AuthReducer = (state = initState, action) => {
	switch(action.type){
		case 'RESTART_AUTH_RESPONSE':
			return {
				...state,
				authResponse: ""
			}
		case 'AUTH_LOADING':
			return {
				...state,
				loading: true
			}
		case 'AUTH_LOADED':
			return {
				...state,
				loading: false
			}
		case 'SIGNUP_SUCCESS':
			return {
				...state,
				authResponse: action.response,
			}
		case 'SIGNUP_ERROR':
			return {
				...state,
				authResponse:action.message
			}
		case 'CODE_ERROR':
			return {
				...state,
        authResponse:'there seems to be a problem please refresh your browser',
			}
		case 'LOGIN_SUCCESS':
			return {
				...state,
        authResponse:'redireccionando a tu inicio..',
        isAuth: true,
        role: action.role,
        roleSelected: action.role[0]
			}
		case 'LOGIN_ERROR':
      return {
        ...state,
        authResponse:action.message,
      }
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        authResponse:action.response,
        isAuth: false,
        role: []
      }
    case 'LOGOUT_ERROR':
      return {
        ...state,
        authResponse:action.message,
      }
    default:
    	return state
	}
}