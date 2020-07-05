import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { matterToAbsencesAction } from 'store/actions/Teacher/AbsenceActions'
import NavbarTeacher from 'components/NavbarTeacher'
import AbsenceForm from 'views/teacher/components/AbsenceForm'
import {
	Container,
	Row,
	Col,
	Card
} from 'react-bootstrap'

export default function AbsenceFormPage() {

	const dispatch = useDispatch();
	const teacherAbsences = useSelector(state => state.absences)

	const [ matters, setMatters ] = useState(teacherAbsences.matters);

	const getMatters = () => {
		dispatch(matterToAbsencesAction());
	}

	useEffect( () => {
		if(matters.length === 0){
			dispatch(matterToAbsencesAction());
		}
	},[dispatch,matters.length])

	useEffect( () => {
		setMatters(teacherAbsences.matters)
	},[teacherAbsences.matters])

		return(
			<Fragment>
				<NavbarTeacher variant="absolute"/>
				<main>
					<section className="section section-lg">
						<Container>
							<Row>
								<Col xs={12} md={10} lg={8} className="mx-auto py-3">
									<Card body className="input-group-alternative-border">
										<h4 className="text-center">Informar Inasistencia</h4>
										<AbsenceForm dataForm={matters} getMatters={getMatters}/>
									</Card>
								</Col>
							</Row>
						</Container>
					</section>
				</main>
			</Fragment>
		)
}