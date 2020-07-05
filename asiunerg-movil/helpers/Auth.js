import * as SecureStore from 'expo-secure-store'

export const handleToken = async () => {
	const token = await SecureStore.getItemAsync('token');
	return token;
}

export const isAuth = () => {
	const token = SecureStore.getItemAsync('token')

	// if ( token !== null && token !== undefined && token !== Promise){
	console.log('token-isAuth',token)
	// 	return true
	// }
	// console.log('token-isAuth',token)
	// return false;
}