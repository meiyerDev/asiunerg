import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addPresentsProfile } from 'store/actions/Teacher/ProfileActions'
import Classes from 'services/Teacher/Classes'
import { createResponse } from 'helpers/Response'
import NavbarTeacher from 'components/NavbarTeacher'
import {toastr} from 'react-redux-toastr'
import {
  useLocation,
  useHistory
} from 'react-router-dom';
import {
	Container,
	Row,
	Col,
	Card,
	Form,
	Button
} from 'react-bootstrap'

export default function ClassesForm(props) {
	const {
		id
	} = props.match.params

	const location = useLocation()
	const history = useHistory()
	const dispatch = useDispatch()
	const {
		students_present,
		store_absences,
		students_absent
	} = location.state

	const [ validate, setValidate ] = useState(false)
	const [ fields, setFields ] = useState({
		theme: '',
		observation: ''
	})

	const handleSubmit = e => {
		e.preventDefault()
		if(!validate) return;
		const form = {
			students_present,
			store_absences,
			students_absent,
			...fields
		}
		toastr.info('Espera un poco', 'Se está informando tu asisencia.');
		Classes.finishClassStudent(id,form)
		.then(resp => {
			const response = createResponse(resp).data
			console.log(response)
			dispatch(addPresentsProfile(1))
			toastr.success('¡Felicidades!', 'Se ha informado tu asistencia con éxito');
			history.push('/profesor/perfil')
		})
		.catch(error => {
			if(error.response.status === 422){
				console.log('error de validacion',error.response.data.message)
				toastr.error('¡Oh no!', error.response.data.message);
			}
			if(error.response.status === 400){
				console.log('error de usuario',error.response.data.message)
				toastr.error('¡Oh no!', error.response.data.message);
			}
		})
	}

	useEffect(() => {
		setValidate(false)
		if(fields.theme !== '' && fields.observation !== ''){
			setValidate(true)
		}
	},[fields])

	return(
		<Fragment>
			<NavbarTeacher variant="absolute"/>
			<main>
				<section className="section section-lg">
					<Container>
						<Row>
							<Col xs={12} md={10} lg={8} className="mx-auto py-3">
								<Card body className="input-group-alternative-border">
									<Col className="text-center">
										<h4 className="m-n2">Datos de clase</h4>
										<small className="small text-muted">Por favor ingrese los datos de la clase impartida.</small>
									</Col>
									<Form
										onSubmit={handleSubmit}
									>
										<Col className="pt-3 px-md-6">
											<Form.Group>
												<Form.Control
													className="input-group-alternative-border"
													placeholder="Tema impartido"
													value={fields.theme}
													onChange={e => setFields({...fields, theme: e.target.value})}
												/>
											</Form.Group>
											<Form.Group>
												<Form.Control
													className="input-group-alternative-border"
													placeholder="Observaciones.."
													as="textarea"
													value={fields.observation}
													onChange={e => setFields({...fields, observation: e.target.value})}
													rows="3"
												/>
											</Form.Group>
											<Form.Group
												className="text-sm-center text-md-right">
												<Button
													onClick={handleSubmit}
													disabled={!validate}
													variant="primary">
													{ validate ? 'Informar asistencia' : 'Complete los datos' }
												</Button>
											</Form.Group>
										</Col>
									</Form>
								</Card>
							</Col>
						</Row>
					</Container>
				</section>
			</main>
		</Fragment>
	)
}