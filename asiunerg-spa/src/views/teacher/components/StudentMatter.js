import React from 'react'
import {
	Col,
	Card
} from 'react-bootstrap'

export default function StudentMatter(props) {
	const {
		student,
		handleChangePresent
	}	= props

	return(
		<Col>
			<Card body>
				<div className="d-flex flex-row justify-content-between align-items-center">
					<div>Cédula: {student.identity} - Nombres: {`${student.name} ${student.lastname}`}</div>
					<div className="custom-control custom-checkbox">
	          <input
	            className="custom-control-input"
	            id="present"
	            type="checkbox"
	            onChange={() => handleChangePresent(student.id)}
	            checked={student.present}
	          />
	          <label className="custom-control-label" htmlFor="present">
	          </label>
	        </div>
				</div>
			</Card>
		</Col>
	)
}