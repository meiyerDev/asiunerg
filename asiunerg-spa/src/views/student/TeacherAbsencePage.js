import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import NavbarStudent from 'components/NavbarStudent'
import FiltroBox from 'components/FiltroBox'
import ListInasistence from 'components/ListInasistence'
import { AbsenceTeacherListAction } from 'store/actions/Student/AbsenceActions'
import { mattersEnrolledAction } from 'store/actions/Student/ProfileActions'
import makeAnimated from 'react-select/animated'
import Select from 'react-select'
import {
	Container,
	Row,
	Col,
	Spinner
} from 'react-bootstrap'

const animatedComponents = makeAnimated()

export default function TeacherAbsencePage() {

	const dispatch = useDispatch()
	const absencesTeachers = useSelector(state => state.absences.theirAbsences)
	const absencesLoading = useSelector(state => state.absences.loading)
  	const matters = useSelector(state => state.profile.matters)
	
  	const [loading, setLoading] = useState(absencesLoading);
	const [ absences, setAbsences ] = useState(absencesTeachers)
	const [ fields, setFields ] = useState({
		matters: []
	})

	useEffect(() => {
		if (absencesTeachers.length === 0){
			dispatch(AbsenceTeacherListAction());
		}
	},[dispatch, absencesTeachers.length])

	useEffect(() => {
		setAbsences(absencesTeachers)
	},[absencesTeachers])

	useEffect(() => {
		if(matters.length === 0){
			dispatch(mattersEnrolledAction())
		}
	},[dispatch, matters.length])

	useEffect(() => {
		if(fields.matters !== null && fields.matters.length !== 0){
			setAbsences(absencesTeachers.filter(absence => fields.matters.includes(absence.code)))
		}else{
			setAbsences(absencesTeachers)
		}
	},[fields.matters, absencesTeachers])

	useEffect(() => {
		setLoading(absencesLoading)
	  }, [absencesLoading])

	const renderTeachersAbsences = () => {
		return (
			<Container>
				<Row className="">
					<Col xs={12} md={4} className="mb-2">
						<FiltroBox>
							{matters !== ""
								? <Select
												className="input-group-alternative"
												placeholder="Materias"
												components={animatedComponents}
												isMulti
												value={(fields.matters === null) ? fields.matters : undefined}
												onChange={e => setFields({...fields, matters: e && e.map(val => val.value)})}
												options={matters.map(matter => ({
													value: matter.code,
													label: matter.name
												}))}
											/>
								: null
							}
						</FiltroBox>
					</Col>
					<Col>
						{ matters.length > 0
							? <ListInasistence
									inasistences={absences}
								/>
							: null
						}
					</Col>
				</Row>
			</Container>
		)
	}

	return(
		<Fragment>
			<NavbarStudent variant="absolute"/>
			<main>
				<section className="section section-lg">
					{loading
						? <div className="d-flex flex-column justify-content-center align-items-center">
							<Spinner animation="border" variant="primary" />
							Cargando
						</div>
						: renderTeachersAbsences()
					}
				</section>
			</main>
		</Fragment>
	)
}