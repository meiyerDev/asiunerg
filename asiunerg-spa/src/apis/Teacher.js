import Api from './Api'
import Csrf from './Csrf'

async function postAvatar(form){
	await Csrf.getCookie()
	return Api.post('/profesor/cambiar/avatar',form)
}

export default {
	postAvatar
}