import axios from 'axios';

let Api = axios.create({
	baseURL: 'http://localhost:8000/api'
	// baseURL: 'http://192.168.1.198:8000/api'
});
Api.defaults.withCredentials = true

export default Api;