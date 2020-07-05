import Api from './Api'

function getCookie() {
	return Api.get('/csrf-cookie')
}

export default {
	getCookie
}