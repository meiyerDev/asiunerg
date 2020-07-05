import React, { Fragment, useEffect, useState } from 'react'
import Classes from 'services/Teacher/Classes'
import { createResponse } from 'helpers/Response'
import NavbarTeacher from 'components/NavbarTeacher'
import StudentMatter from 'views/teacher/components/StudentMatter'
import {toastr} from 'react-redux-toastr'
import {
	useHistory
} from "react-router-dom";
import {
	Container,
	Row,
	Button
} from 'react-bootstrap'

function StudentPresentForm(props) {
	const {
		students,
		handleChangePresent,
		handleSubmitPresent,
		handleFinishClass,
		isMarkable
	} = props

	return (
		<Fragment>
			{students.map(student => (
				<StudentMatter
					key={student.identity}
					student={student}
					handleChangePresent={handleChangePresent}
				/>
			))}
			<div className="d-flex justify-content-center justify-content-md-end aling-items-center mx-2">
				{
					isMarkable
						? (<Fragment>
							<Button
								className="mt-3 d-none d-md-block"
								variant="danger"
								onClick={handleFinishClass}
							>FINALIZAR CLASE</Button>
							<Button
								onClick={handleSubmitPresent}
								className="mt-3 d-none d-md-block"
							>INFORMAR ASISTENTES</Button>
							<Button
								block
								className="mt-3 d-block d-md-none"
								onClick={handleFinishClass}
							>FINALIZAR CLASE</Button>
							<Button
								block
								onClick={handleSubmitPresent}
								variant="danger"
								className="mt-3 d-block d-md-none"
							>INFORMAR ASISTENTES</Button>
						</Fragment>)
						: null
				}
			</div>
		</Fragment>
	)
}

export default function StudentsMatterList(props) {
	const {
		id
	} = props.match.params

	const history = useHistory()

	const [students, setStudents] = useState([])
	const [isMarkable, setIsMarkable] = useState(false)

	const getStudentsMatter = sectionID => {
		toastr.info('Espera un poco', 'Se están buscando tus estudiantes.');
		Classes.getStudentsForMatter(sectionID)
			.then(resp => {
				const response = createResponse(resp).data.data;
				setStudents(response.students);
				if(response.students.length === 0) {
					toastr.warning('¡No te preocupes!', 'Actualmente no tienes inscrito estudiantes en la apliación.');
				}
				setIsMarkable(response.is_markable)
			})
			.catch(error => {
				console.log('error: ', error)
			})
	}

	const handleChangePresent = id => {
		const newStudents = students.map(student => {
			let val = student
			if (student.id === id) {
				val = { ...student, present: !student.present }
			}
			return val
		})
		setStudents(newStudents)
	}

	const handleFinishClass = () => {
		history.push({
			pathname: `/profesor/clases/materia/finalizar/${id}`,
			state: {
				students_present: students.filter(student => student.present).map(student => student.id),
				students_absent: students.filter(student => !student.present).map(student => student.id),
				store_absences: true
			}
		})
	}

	const handleSubmitPresent = e => {
		e.preventDefault();
		const form = {
			students_present: students.filter(student => student.present).map(student => student.id),
			students_absent: students.filter(student => !student.present).map(student => student.id),
		}
		toastr.info('Espera un poco', 'Se informarán los asistentes a clases.');
		Classes.newClassStudents(id, form)
			.then(resp => {
				const response = createResponse(resp).data/*.data*/;
				setStudents(students.filter(student => !response.present.includes(student.id)))
				toastr.success('¡Perfecto!', 'Se informaron los asistentes con éxito.');
			})
			.catch(error => {
				console.log('error: ', error.response)
			})
	}

	useEffect(() => {
		getStudentsMatter(id);
	}, [id])

	return (
		<Fragment>
			<NavbarTeacher variant="absolute" />
			<main>
				<section className="section section-lg">
					<Container>
						<h5>Listado de estudiantes:</h5>
						<Row className="d-flex flex-column">
							{students.length > 0
								? <StudentPresentForm
									students={students}
									handleChangePresent={handleChangePresent}
									handleSubmitPresent={handleSubmitPresent}
									handleFinishClass={handleFinishClass}
									isMarkable={isMarkable}
								/>
								: (<Fragment>
									<h4 className="text-danger">No existen estudiantes inscritos</h4>
									{
										isMarkable
											? (<Button
												className="mt-3"
												variant="primary"
												onClick={handleFinishClass}
											>MARCAR ASISTENCIA DE CLASE</Button>)
											: null
									}
								</Fragment>)
							}
						</Row>
					</Container>
				</section>
			</main>
		</Fragment>
	)
}