import React from 'react';
import {
	Picker
} from 'react-native';

function SelectPicker(props) {
	const {
		data
	} = props;
	return(
		<Picker
			{...props}
    	>
			{data.map((dt,index) => <Picker.Item label={dt.label} value={dt.value} key={`${index}-${dt.value}`}/>)}
		</Picker>
	)
}

export default SelectPicker;