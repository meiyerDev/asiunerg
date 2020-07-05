import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useFormFields } from 'helpers/hooksFormInput'
import { useHistory } from 'react-router-dom'
import { LoginAction, clearAuthState } from 'store/actions/Auth/AuthActions'
import {
	Container,
	Row,
	Col,
	Card,
	Form,
	FormControl,
	Alert,
	Button,
	InputGroup,
	Spinner
} from 'react-bootstrap'

export default function Login(props) {
	const history = useHistory()
	const dispatch = useDispatch();
	const authResponse = useSelector(state => state.auth.authResponse);
	const authLoading = useSelector(state => state.auth.loading);

	const [fields, handleFieldChange] = useFormFields({
		identity: '',
		email: '',
		password: '',
	})

	const [showError, setShowError] = useState(true)
	const [loading, setLoading] = useState(authLoading)

	const handleLogin = e => {
		e.preventDefault()
		setShowError(true)
		dispatch(LoginAction(fields, props))
	}

	useEffect(() => {
		dispatch(clearAuthState())
	}, [dispatch])

	useEffect(() => {
		setShowError(false)
	}, [fields])

	useEffect(() => {
		setLoading(authLoading)
	},[authLoading])

	return (
		<Fragment>
			<main>
				<section className="section section-shaped section-lg">
					<div className="shape shape-style-1 bg-gradient-primary">
						<span />
						<span />
						<span />
						<span />
						<span />
						<span />
						<span />
						<span />
					</div>
					<Container className="py-lg-4">
						<Row className="justify-content-center">
							<Col lg="5" className="my-lg-6">
								<Card className="bg-secondary shadow border-0 my-lg-6">
									<Card.Header className="bg-white pb-2">
										<h2 className="text-center">Iniciar Sesión</h2>
									</Card.Header>
									<Card.Body className="px-lg-5 pt-lg-5 pb-lg-3">
										<Form
											onSubmit={handleLogin}>
											{(authResponse.hasOwnProperty('errors') && showError) ? (
												<Alert className="text-center" variant="danger" onClose={() => setShowError(false)} dismissible>
													{/*error.errors.hasOwnProperty('password') ? */authResponse.message/* : error.errors.email[0]*/}
												</Alert>
											) : null}
											<Form.Group className="mb-3">
												<InputGroup className="input-group-alternative">
													<InputGroup.Prepend>
														<InputGroup.Text id="identity-icon">
															<i className="ni ni-email-83" />
														</InputGroup.Text>
													</InputGroup.Prepend>
													<FormControl
														type="text"
														className="form-control-alternative"
														isValid={authResponse.hasOwnProperty('errors') && !authResponse.errors.hasOwnProperty('identity')}
														isInvalid={authResponse.hasOwnProperty('errors') && authResponse.errors.hasOwnProperty('identity')}
														aria-describedby="identity-icon"
														placeholder="Cédula"
														id="identity"
														value={fields.identity}
														onChange={handleFieldChange}
													/>
													{authResponse.hasOwnProperty('errors') && authResponse.errors.hasOwnProperty('identity') ? (<Form.Control.Feedback className="p-1" type="invalid">{authResponse.errors.identity[0]}</Form.Control.Feedback>) : null}
												</InputGroup>
											</Form.Group>
											<Form.Group className="mb-3">
												<InputGroup className="input-group-alternative">
													<InputGroup.Prepend>
														<InputGroup.Text id="email-icon">
															<i className="ni ni-email-83" />
														</InputGroup.Text>
													</InputGroup.Prepend>
													<FormControl
														type="email"
														className="form-control-alternative"
														isValid={authResponse.hasOwnProperty('errors') && !authResponse.errors.hasOwnProperty('email')}
														isInvalid={authResponse.hasOwnProperty('errors') && authResponse.errors.hasOwnProperty('email')}
														aria-describedby="email-icon"
														placeholder="Correo Electrónico"
														id="email"
														value={fields.email}
														onChange={handleFieldChange}
													/>
													{authResponse.hasOwnProperty('errors') && authResponse.errors.hasOwnProperty('email') ? (<Form.Control.Feedback className="p-1" type="invalid">{authResponse.errors.email[0]}</Form.Control.Feedback>) : null}
												</InputGroup>
											</Form.Group>
											<Form.Group>
												<InputGroup className="input-group-alternative">
													<InputGroup.Prepend>
														<InputGroup.Text id="password-icon">
															<i className="ni ni-lock-circle-open" />
														</InputGroup.Text>
													</InputGroup.Prepend>
													<FormControl
														type="password"
														isValid={authResponse.hasOwnProperty('errors') && !authResponse.errors.hasOwnProperty('password')}
														isInvalid={authResponse.hasOwnProperty('errors') && authResponse.errors.hasOwnProperty('password')}
														aria-describedby="password-icon"
														placeholder="Contraseña"
														className="form-control-alternative"
														id="password"
														value={fields.password}
														onChange={handleFieldChange}
													/>
													{authResponse.hasOwnProperty('errors') && authResponse.errors.hasOwnProperty('password') ? (<Form.Control.Feedback className="p-1" type="invalid">{authResponse.errors.password[0]}</Form.Control.Feedback>) : null}
												</InputGroup>
											</Form.Group>
											<div className="text-center">
												<Button
													onClick={handleLogin}
													className="my-4"
													variant="primary"
													disabled={loading}
													type="button">
													{authLoading
														? 	<Fragment>
																<Spinner
																	as="span"
																	animation="border"
																	size="sm"
																	role="status"
																	aria-hidden="true"
																/>
																Espere..
															</Fragment>
														: 'Iniciar Sesión'
													}
												</Button>
											</div>
											<div className="text-right mr-n4">
												<Button
													className="text-info"
													variant="link"
													onClick={e => {
														e.preventDefault()
														history.push('/registrar')
													}}
												>
													¡Registrate!
				                				</Button>
											</div>
										</Form>
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</Container>
				</section>
			</main>
		</Fragment>
	)
}
