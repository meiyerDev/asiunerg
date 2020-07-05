import axios from 'axios';
import * as SecureStore from 'expo-secure-store'

let Api = axios.create({
	baseURL: 'https://asiunerg.me/api',
	headers: {
		post: {
			Accept: 'application/json'
		}
	}
	// baseURL: 'http://192.168.1.198:8000/api'
});
Api.defaults.withCredentials = true

export default Api;