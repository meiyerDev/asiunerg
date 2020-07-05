import React, { Fragment } from 'react'
import BoxInfo from 'components/BoxInfo'

export default function ListInasistence(props){
	const {
		inasistences
	} = props;

	return(
		<Fragment>
			{inasistences.map(inasistence => (
				<BoxInfo data={inasistence} key={inasistence.id} />
			))}
		</Fragment>
	)
}