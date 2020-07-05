import React from 'react'
import { useHistory } from "react-router-dom"
import {
	Col,
	Card,
	Button
} from 'react-bootstrap'

export default function MatterBox (props) {
	const {
		matter
	} = props

  const history = useHistory()

	return(
		<Col className="my-1">
			<Card body style={{height:200}}>
				<div className="d-flex flex-column justify-content-between">
					<div>
						<h5>{matter.name}</h5>
						<p>Sección: {matter.section}</p>
						<p>Código: {matter.code}</p>
					</div>
					<Button
						variant="primary"
						block
						onClick={() => history.push(`/profesor/clases/materia/${matter.id}`)}
					>
						MARCAR ASISTENCIA
					</Button>
				</div>
			</Card>
		</Col>
	)
}