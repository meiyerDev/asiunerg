import { combineReducers } from 'redux'
import { AuthReducer } from './auth/AuthReducer'
import { ProfileReducer } from './ProfileReducer'
import { AbsencesReducer } from './AbsencesReducer'
import { NotificationReducer } from './notify/NotificationReducer'

export const RootReducer = combineReducers({
  auth: AuthReducer,
	profile : ProfileReducer,
	absences : AbsencesReducer,
  notify: NotificationReducer
})