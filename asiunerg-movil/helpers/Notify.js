export const Notify = (type, message, notify, setNotification, time = 1500) => {
	setNotification({
			show: true,
			type: type,
			message: message
		})
	setTimeout(() => {
		setNotification({
			...notify,
			show: false
		})
	}, time)
}