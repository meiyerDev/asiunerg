import {combineReducers} from 'redux'
import { AuthReducer } from 'store/reducers/Auth/AuthReducer'
import { ProfileReducers } from 'store/reducers/ProfileReducers'
import { AbsencesReducers } from 'store/reducers/AbsencesReducers'
import { reducer as toastrReducer } from 'react-redux-toastr'

const RootReducer = combineReducers({
	auth: AuthReducer,
	profile: ProfileReducers,
	absences: AbsencesReducers,
	toastr: toastrReducer,
})

export default RootReducer