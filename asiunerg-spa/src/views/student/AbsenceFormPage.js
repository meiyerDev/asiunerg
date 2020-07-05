import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { matterToAbsencesAction } from 'store/actions/Student/AbsenceActions'
import NavbarStudent from 'components/NavbarStudent'
import FormInasistence from 'components/FormInasistence'
import {
	Container,
	Row,
	Col,
	Card
} from 'react-bootstrap'

export default function AbsenceFormPage() {

	const dispatch = useDispatch();
	const studentAbsences = useSelector(state => state.absences)

	const [ matters, setMatters ] = useState(studentAbsences.matters);

	const getMatters = () => {
		dispatch(matterToAbsencesAction());
	}

	useEffect( () => {
		if(matters.length === 0){
			dispatch(matterToAbsencesAction());
		}
	},[dispatch,matters.length])

	useEffect( () => {
		setMatters(studentAbsences.matters)
	},[studentAbsences.matters])

		return(
			<Fragment>
				<NavbarStudent variant="absolute"/>
				<main>
					<section className="section section-lg">
						<Container>
							<Row>
								<Col xs={12} md={10} lg={8} className="mx-auto py-3">
									<Card body className="input-group-alternative-border">
										<h4 className="text-center">Informar Inasistencia</h4>
										<FormInasistence dataForm={matters} getMatters={getMatters}/>
									</Card>
								</Col>
							</Row>
						</Container>
					</section>
				</main>
			</Fragment>
		)
}