const initState = {
	profile: {
		user: {
			id: null,
			email: "",
			identity: null
		},
		student: {
			id: null,
			identity: null,
			name: "",
			lastname: ""
		},
		teacher: {
			id: null,
			email: "",
			phone: "",
			name: "",
			lastname: ""
		},
		inscriptions_count: 0,
		presents_count: 0,
		absents_count: 0
	},
	matters: [],
	loading: true,
	error: ""
}

export const ProfileReducer = (state = initState, action) => {
	switch (action.type) {
		case 'PROFILE_LOADING':
			return {
				...state,
				loading: true
			}
		case 'PROFILE_LOADED':
			return {
				...state,
				loading: false
			}
		case 'PROFILE_DATA':
			return {
				...state,
				profile: action.payload,
			}
		case 'PROFILE_ERROR':
			return {
				...state,
				error: action.payload
			}
		case 'MATTER_LIST':
			return {
				...state,
				matters: action.payload
			}
		case 'MATTER_LIST_ERROR':
			return {
				...state,
				error: action.payload
			}
		case 'PROFILE_ADD_ABSENCE':
			return {
				...state,
				profile: {
					...state.profile,
					absents_count: state.profile.absents_count + action.payload
				}
			}
		case 'PROFILE_DELETE_ABSENCE':
			return {
				...state,
				profile: {
					...state.profile,
					absents_count: state.profile.absents_count - 1
				}
			}
		case 'PROFILE_ADD_PRESENTS':
			return {
				...state,
				profile: {
					...state.profile,
					presents_count: state.profile.presents_count + action.payload
				}
			}
		case 'CLEAR_PROFILE':
			return {
				...state,
				profile: {
					user: {
						id: null,
						email: "",
						identity: null
					},
					student: {
						id: null,
						identity: null,
						name: "",
						lastname: ""
					},
					teacher: {
						id: null,
						email: "",
						phone: "",
						name: "",
						lastname: ""
					},
					inscriptions_count: 0,
					presents_count: 0,
					absents_count: 0
				},
				matters: [],
				loading: true,
				error: ""
			}
		default:
			return state
	}
}