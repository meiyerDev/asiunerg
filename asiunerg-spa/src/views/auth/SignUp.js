import React, { useState, useEffect, Fragment } from 'react'
import { signUpAction, clearAuthState } from 'store/actions/Auth/AuthActions'
import { useDispatch, useSelector } from 'react-redux';
import { useFormFields } from 'helpers/hooksFormInput'
import { useHistory } from 'react-router-dom'
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

export default function SignUp(props) {

	const history = useHistory()
	const dispatch = useDispatch();
	const authLoading = useSelector(state => state.auth.loading);
	const authResponse = useSelector(state => state.auth.authResponse);

	const [fields, handleChangeFields] = useFormFields({
		identity: '',
		email: '',
		password: '',
		password_confirmation: '',
	})
	const [isLoading, setIsLoading] = useState(authLoading)
	const [showError, setShowError] = useState(true)

	const handleSignup = (e) => {
		e.preventDefault()
		setShowError(true)

		dispatch(signUpAction(fields, props))
	}

	useEffect(() => {
		dispatch(clearAuthState())
	}, [dispatch])

	useEffect(() => {
		setShowError(false)
	}, [fields])

	useEffect(() => {
		setIsLoading(authLoading)
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
								<Card className="bg-secondary shadow border-0">
									<Card.Header className="bg-white pb-2">
										<h2 className="text-center">Registrate</h2>
									</Card.Header>
									<Card.Body className="px-lg-5 pt-lg-5 pb-lg-3">
										<Form
											onSubmit={handleSignup}>
											{(authResponse.hasOwnProperty('errors') && showError) ? (
												<Alert variant="danger" onClose={() => setShowError(false)} dismissible>
													{authResponse.hasOwnProperty('message') ? authResponse.message : null}
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
														isValid={authResponse.hasOwnProperty('errors') && !authResponse.errors.hasOwnProperty('identity')}
														isInvalid={authResponse.hasOwnProperty('errors') && authResponse.errors.hasOwnProperty('identity')}
														className="form-control-alternative"
														aria-describedby="identity-icon"
														placeholder="Cédula"
														id="identity"
														value={fields.identity}
														onChange={handleChangeFields}
													/>
													{authResponse.hasOwnProperty('errors') && authResponse.errors.hasOwnProperty('identity') ? (<Form.Control.Feedback type="invalid" className="p-1">{authResponse.errors.identity[0]}</Form.Control.Feedback>) : null}
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
														isValid={authResponse.hasOwnProperty('errors') && !authResponse.errors.hasOwnProperty('email')}
														isInvalid={authResponse.hasOwnProperty('errors') && authResponse.errors.hasOwnProperty('email')}
														className="form-control-alternative"
														aria-describedby="email-icon"
														placeholder="Correo Electrónico"
														id="email"
														value={fields.email}
														onChange={handleChangeFields}
													/>
													{authResponse.hasOwnProperty('errors') && authResponse.errors.hasOwnProperty('email') ? (<Form.Control.Feedback type="invalid" className="p-1">{authResponse.errors.email[0]}</Form.Control.Feedback>) : null}
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
														isInvalid={authResponse.hasOwnProperty('errors') && (authResponse.errors.hasOwnProperty('password') || authResponse.errors.hasOwnProperty('email'))}
														aria-describedby="password-icon"
														placeholder="Contraseña"
														className="form-control-alternative"
														id="password"
														value={fields.password}
														onChange={handleChangeFields}
													/>
													{authResponse.hasOwnProperty('errors') && authResponse.errors.hasOwnProperty('password') ? (<Form.Control.Feedback type="invalid" className="p-1">{authResponse.errors.password[0]}</Form.Control.Feedback>) : null}
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
														isValid={authResponse.hasOwnProperty('errors') && !authResponse.errors.hasOwnProperty('password_confirmation')}
														isInvalid={authResponse.hasOwnProperty('errors') && (authResponse.errors.hasOwnProperty('password') || authResponse.errors.hasOwnProperty('email'))}
														aria-describedby="password-icon"
														placeholder="Confirme Contraseña"
														className="form-control-alternative"
														id="password_confirmation"
														value={fields.password_confirmation}
														onChange={handleChangeFields}
													/>
													{authResponse.hasOwnProperty('errors') && authResponse.errors.hasOwnProperty('password') ? (<Form.Control.Feedback type="invalid" className="p-1">{authResponse.errors.password[0]}</Form.Control.Feedback>) : null}
												</InputGroup>
											</Form.Group>
											<div className="custom-control custom-checkbox mb-3">
												<input
													className="custom-control-input"
													id="remenber"
													type="checkbox"
												/>
												<label className="custom-control-label" htmlFor="remenber">
													Acepto los Terminos y Condiciones
							          			</label>
											</div>
											<div className="text-center">
												<Button
													onClick={handleSignup}
													className="my-4"
													variant="primary"
													disabled={isLoading}
													type="button">
													{isLoading
													?	<Fragment>
															<Spinner
																as="span"
																animation="border"
																size="sm"
																role="status"
																aria-hidden="true"
															/>
															Espere..
														</Fragment>
													: 'Registrate'}
												</Button>
											</div>
											<div className="text-right mr-n4">
												<Button
													className="text-info"
													variant="link"
													onClick={e => {
														e.preventDefault()
														history.push('/acceder')
													}}
												>
													¡Iniciar Sesión!
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

	// return(
	// 	<div className="container justify-content-center row">
	// 		<div className="card mt-4">
	// 			<div className="card-body">
	// 				<h3 className="text-center">¡ Registrate !</h3>
	// 				<form
	// 					className="text-center"
	// 					onSubmit={handleSignup}>
	// 					{error && <div className="alert alert-danger">{error}</div>}
	// 					<div className="col-sm-12 mt-1 from-group">
	// 						<input
	// 							type="text"
	// 							id="identity"
	// 							placeholder="Cédula"
	// 							onChange={e => setIdentity(e.target.value)}
	// 							className="form-control"/>
	// 					</div>
	// 					<div className="col-sm-12 mt-1 from-group">
	// 						<input
	// 							type="email"
	// 							id="email"
	// 							placeholder="Correo Electrónico"
	// 							onChange={e => setEmail(e.target.value)}
	// 							className="form-control"/>
	// 					</div>
	// 					<div className="col-sm-12 mt-1 from-group">
	// 						<input
	// 							type="password"
	// 							id="password"
	// 							placeholder="Contraseña"
	// 							onChange={e => setPassword(e.target.value)}
	// 							className="form-control"/>
	// 					</div>
	// 					<div className="col-sm-12 mt-1 from-group">
	// 						<input
	// 							type="password"
	// 							id="confirm_password"
	// 							placeholder="Contraseña"
	// 							onChange={e => setConfirmPassword(e.target.value)}
	// 							className="form-control"/>
	// 					</div>
	// 					<button
	// 						className="btn btn-primary mt-1"
	// 						onClick={handleSignup}>Iniciar Sesión</button>
	// 				</form>
	// 			</div>
	// 		</div>
	// 	</div>
	// )
}
