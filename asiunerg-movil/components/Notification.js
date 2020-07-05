import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Block, Toast, Text } from "galio-framework";

export function Notification(props) {
	const {
		message
	} = props;

	return(
			<Toast
				{...props}
			>
				{message}
			</Toast>
	);
}