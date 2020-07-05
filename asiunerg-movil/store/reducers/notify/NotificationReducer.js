const initState = {
	type: '',
	message: ''
}

export const NotificationReducer = (state = initState, action) => {
	switch (action.type){
		case 'SUCCESS_NOTIFICATION':
			return {
				...state,
				type: 'success',
				message: action.payload
			}
		case 'ERROR_NOTIFICATION':
			return {
				...state,
				type: 'error',
				message: action.payload
			}
		case 'INFO_NOTIFICATION':
			return {
				...state,
				type: 'info',
				message: action.payload
			}
		case 'WARNING_NOTIFICATION':
			return {
				...state,
				type: 'warning',
				message: action.payload
			}
		case 'CLEAR_NOTIFICATION':
			return {
				...state,
				type: '',
				message: ''
			}
		default:
			return state
	}
}
