import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { matterAssignAction } from 'store/actions/Teacher/ProfileActions'
import NavbarTeacher from 'components/NavbarTeacher'
import MatterBox from 'views/teacher/components/MatterBox'
import {
	Container,
	Row
} from 'react-bootstrap'

export default function MattersPage () {

	const dispatch = useDispatch();
	const teacherMatters = useSelector(state => state.profile.matters)

	useEffect(() => {
		if(teacherMatters.length === 0) {
			dispatch(matterAssignAction())
		}
	},[dispatch, teacherMatters])

	return (
		<Fragment>
			<NavbarTeacher variant="absolute"/>
			<main>
				<section className="section section-lg">
					<Container>
						<Row className="d-flex justify-content-around align-items-center">
							{ teacherMatters !== ""
									? teacherMatters.length > 0
										? teacherMatters.map(matter => (
												<MatterBox key={matter.code} matter={matter} />
											))
										: <h1>No tiene materias asignadas</h1>
									: <h3>Cargando..</h3>
							}
						</Row>
					</Container>
				</section>
			</main>
		</Fragment>
	)
} 