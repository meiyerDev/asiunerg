import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { reportAbsenceAction } from 'store/actions/Teacher/AbsenceActions'
import makeAnimated from 'react-select/animated'
import ReactDatetime from "react-datetime"
import Select from 'react-select'
import {
	Form,
	Col,
	InputGroup,
	Button,
	// FormControl
} from 'react-bootstrap'

const animatedComponents = makeAnimated()

export default function AbsenceForm (props) {
	
	const {
		dataForm,
		// getMatters
	} = props

	const dispatch = useDispatch();

	const [ validate, setValidate ] = useState(false)
	const [ fields, setFields ] = useState({
		typeAbsence: 0,
		section: null,
		day: null,
		reason: null,
		observation: "",
	});

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(reportAbsenceAction(fields));
		resetForm();
	}

	const resetForm = () => {
		setFields({
			...fields,
			typeAbsence: 0,
			section: null,
			day: null,
			reason: null,
			observation: "",
		})
	}

	const yesterday = ReactDatetime.moment().subtract( 1, 'day' );
	const valid = function( current ){
	    return (current.day() !== 0 && current.day() !== 6) && current.isAfter(yesterday);
	};

	useEffect(() => {
		if( (
					(
						fields.typeAbsence === 1 
							&& ( fields.section !== null && fields.section.length > 0 )
					) || (
						fields.typeAbsence === 2 && fields.day !== null
					)
				)
				&& fields.observation !== "" && fields.reason !== null
			)
		{
			setValidate(true)
		}else{
			setValidate(false)
		}
	}, [fields])

	return (
		<Form
			onSubmit={handleSubmit}
		>
			<Col className="pt-4 px-md-6">
				<Form.Group>
					<Select
						className="input-group-alternative"
						placeholder="Tipo de inasistencia"
						onChange={e => setFields({...fields, typeAbsence: e.value})}
						options={[
							{value: 1, label: 'Por materia y sección'},
							{value: 2, label: 'Por día'},
						]}/>
				</Form.Group>
				{fields.typeAbsence === 1
					? <Form.Group>
							<Select
								className="input-group-alternative"
								placeholder="Materia - sección"
								closeMenuOnSelect={false}
								components={animatedComponents}
								isMulti
								value={(fields.section === null) ? fields.section : undefined}
								onChange={e => {setFields({...fields, section: e && e.map(val => val.value)})}}
								options={dataForm}/>
						</Form.Group>
					: fields.typeAbsence === 2
						? <Form.Group controlId="day">
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
			            	onChange={(e) => setFields({...fields,day: e.format('DD-MM-YYYY')})}
				            isValidDate={valid}
				            dateFormat='DD-MM-YYYY'
				            closeOnSelect={true}
										timeFormat={false}
									/>
								</InputGroup>
							</Form.Group>
						: null
				}
				<Form.Group>
					<Select
						className="input-group-alternative"
						placeholder="Motivo de inasistencia"
						onChange={e => setFields({...fields, reason: e.value})}
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
						value={fields.observation}
						onChange={e => setFields({...fields, observation: e.target.value})}
						rows="3" />
				</Form.Group>
				<Form.Group
					className="text-right">
					<Button
						disabled={!validate}
						onClick={handleSubmit}
						variant="primary">
						{ validate ? 'Informar inasistencia' : 'Complete los datos' }
					</Button>
				</Form.Group>
			</Col>
		</Form>
	);
}