export const createResponse = (response) => {
	return {
		status: response.status,
		statusText: response.statusText,
		data: response.data
	}
}