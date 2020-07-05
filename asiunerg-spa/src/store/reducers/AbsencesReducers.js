const initState = {
	absences : [],
	matters : [],
	theirAbsences: [],
	error : false,
	loading : true,
	metaAbsences : {},
	metaTheirAbsences : {}
}

export const AbsencesReducers = (state = initState, action) => {
	switch (action.type){
		case 'ABSENCE_LOADING':
			return {
				...state,
				loading: true
			}
		case 'ABSENCE_LOADED':
			return {
				...state,
				loading: false
			}
		case 'ADD_ABSENCE':
			return {
				...state,
				absences: [...state.absences, action.payload]
			}
		case 'ABSENCES_LIST':
			return {
				...state,
				absences: action.payload
			}
		case 'ABSENCES_META_LINKS':
			return {
				...state,
				metaAbsences: action.payload
			}
		case 'ABSENCES_LIST_ERROR':
			return {
				...state,
				error: action.payload.data
			}
		case 'ABSENCE_DELETE':
			return {
				...state,
				absences: state.absences.filter(absence => absence.id !== action.payload.id),
				matters: [ ...state.matters.filter(matter => matter.id !== action.payload.matter.id), action.payload.matter]
			}
		case 'MATTERS_TO_ABSENCES':
			return {
				...state,
				matters: action.payload
			}
		case 'MATTERS_TO_ABSENCES_ERROR':
			return {
				...state,
				error: action.payload.data
			}
		case 'RESPONSE_MATTERS_TO_ABSENCES':
			return {
				...state,
				matters: state.matters.filter(matter => !action.payload.matters.includes(matter.value)),
				absences: [...state.absences, ...action.payload.absences],
			}
		case 'ABSENCE_RESTORE_DATA':
			return {
				...state,
				absences : [],
				matters : [],
				error : false,
				loading : true
			}
		case 'ABSENCE_THEIR_LIST':
			return {
				...state,
				theirAbsences: action.payload
			}
		default:
			return state
	}
}