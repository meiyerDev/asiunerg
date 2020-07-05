import Api from 'services/Api'

function getCookie() {
	return Api.get('/csrf-cookie')
}

export default {
	getCookie
}