const initState = {
	authResponse: "",
	isAuth: false,
	loading: false,
	role: [],
	selectedRole: ""
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
        role: action.payload,
        selectedRole: action.payload[0]
			}
		case 'LOGIN_ERROR':
      return {
        ...state,
        authResponse:action.message,
      }
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        authResponse:action.payload,
        isAuth: false
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