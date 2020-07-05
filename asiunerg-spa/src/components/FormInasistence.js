import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reportAbsenceAction } from 'store/actions/Student/AbsenceActions'
import makeAnimated from 'react-select/animated'
import ReactDatetime from "react-datetime"
import Select from 'react-select'
import {
	Form,
	Col,
	InputGroup,
	Button,
	FormControl,
	Spinner
} from 'react-bootstrap'

const animatedComponents = makeAnimated()

export default function FormInasistence(props) {

	const dispatch = useDispatch()

	const {
		dataForm,
	} = props

  	const absencesLoading = useSelector(state => state.absences.loading)
	
	  const [ typeAbsence, setTypeAbsence ] = useState(0)
	const [ section, setSection ] = useState(null)
	const [ day, setDay ] = useState(null)
	const [ reason, setReason ] = useState(null)
	const [ observation, setObservation ] = useState(null)
	const [ week, setWeek ] = useState(null)
	const [ validate, setValidate ] = useState(false)
	const [ loading, setLoading ] = useState(false)

	const resetForm = () => {
		setSection(null)
		setDay(null)
		setWeek(null)
		setObservation(null)
		setReason(null)
	}

	const handleChangeType = e => {
		setTypeAbsence(e.value)
	}

	const handleSubmit = e => {
		e.preventDefault()
		
		if(!validate) return;
		const form = {
			typeAbsence,
			section,
			day,
			week,
			reason,
			observation
		}

		dispatch(reportAbsenceAction(form));
		
		resetForm();
	}

	const yesterday = ReactDatetime.moment().subtract( 1, 'day' );

	const valid = function( current ){
	    return (current.day() !== 0 && current.day() !== 6) && current.isAfter(yesterday);
	};

	useEffect(() => {
		if( (
					typeAbsence === 3
					&& (observation !== '' && observation !== null) 
					&& (reason !== '' && reason !== null)
				) || (
					(
						(section !== null && section !== '' && section.length > 0)
						|| (day !== null && day !== '')
					)
					&& (observation !== '' && observation !== null) 
					&& (reason !== '' && reason !== null)
				)
			){
			setValidate(true)
		}else{setValidate(false)}
	},[section, day, observation, typeAbsence, reason])

	useEffect(() => {
		setLoading(absencesLoading)
	}, [absencesLoading])

	return(
		<Form
			onSubmit={handleSubmit}>
			<Col className="pt-4 px-md-6">
				<Form.Group>
					<Select
						className="input-group-alternative"
						placeholder="Tipo de inasistencia"
						onChange={handleChangeType}
						options={[
							{value: 1, label: 'Por materia'},
							{value: 2, label: 'Por día'},
						]}/>
				</Form.Group>
				{ typeAbsence === 1 ? (
						<Form.Group>
							<Select
								className="input-group-alternative"
								placeholder="Materias"
								closeMenuOnSelect={false}
								components={animatedComponents}
								isMulti
								value={(section === null) ? section : undefined}
								onChange={e => {setSection(e && e.map(val => val.value))}}
								options={dataForm}/>
						</Form.Group>
					) : typeAbsence === 2 ? (
						<Form.Group controlId="day">
							<InputGroup className="input-group-alternative-border">
								<InputGroup.Prepend>
									<InputGroup.Text id="date-icon">
										<i className="ni ni-calendar-grid-58" />
									</InputGroup.Text>
								</InputGroup.Prepend>
								<ReactDatetime
									inputProps={{
			              placeholder: "Selecciona el día de tu inasistencia",
			            }}
		            	onChange={(e) => setDay(e.format('DD-MM-YYYY'))}
			            isValidDate={valid}
			            dateFormat='DD-MM-YYYY'
			            closeOnSelect={true}
									timeFormat={false}
								/>
							</InputGroup>
						</Form.Group>
					) : typeAbsence === 3 ? (
						<Form.Group>
							<InputGroup className="input-group-alternative-border">
								<InputGroup.Prepend>
									<InputGroup.Text id="date-icon">
										<i className="ni ni-calendar-grid-58" />
									</InputGroup.Text>
								</InputGroup.Prepend>
								<FormControl
									placeholder="Número de semanas de ausencia"
									onChange={e => setWeek(e.target.vale)}
								/>
							</InputGroup>
						</Form.Group>
					) : null
				}
				<Form.Group>
					<Select
						className="input-group-alternative"
						placeholder="Motivo de inasistencia"
						onChange={e => setReason(e.value)}
						options={[
							{value: 1, label: 'Sin pasaje para el transporte'},
							{value: 2, label: 'Reposo médico'},
							{value: 3, label: 'Problema familiar'},
						]}/>
				</Form.Group>
				<Form.Group controlId="observation">
					<Form.Control
						className="input-group-alternative-border"
						placeholder="Observaciones.."
						as="textarea"
						value={observation ?? ''}
						onChange={e => setObservation(e.target.value)}
						rows="3" />
				</Form.Group>
				<Form.Group
					className="text-right">
					<Button
						disabled={!validate}
						onClick={handleSubmit}
						variant="primary">
						{loading
							? <div className="d-flex flex-row justify-content-center align-items-center">
								<Spinner animation="border" as="span" size="sm" role="status" aria-hidden="true" />
								Cargando
							  </div>
							: validate ? 'Informar inasistencia' : 'Complete los datos'
						}
					</Button>
				</Form.Group>
			</Col>
		</Form>
	)
}