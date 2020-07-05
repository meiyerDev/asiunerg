import React from 'react'

import { 
	Table
} from 'react-bootstrap'

export default function TableComponents(props) {

	const {
		data,
		headers
	} = props;

	return(
		<Table responsive striped hover>
		  <thead>
		    <tr>
		    	{
		    		headers.map((header,index) => (
				      <th key={index}>{header.name}</th>
		    		))
		    	}
		    </tr>
		  </thead>
		  <tbody>
		  	{ (data) ?
			  		data.map((row, index) => (
					  	<tr key={index}>
					  		<td>{row.code}</td>
					  		<td>{row.name}</td>
					  		<td>{row.section}</td>
					  	</tr>
			  		))
			  	: null
		  	}
		  </tbody>
		</Table>
	);
}