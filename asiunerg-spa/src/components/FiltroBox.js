import React from 'react'
import {
	Card
} from 'react-bootstrap'

export default function FiltroBox({children}){
	return(
		<Card>
        	<Card.Header className="text-center py-2">
        		<h4>Filtrar Faltas</h4>
        	</Card.Header>
        	<Card.Body>
        		{children}
        	</Card.Body>
        </Card>
	)
}