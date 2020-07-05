import React, { Fragment, useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Profile from 'services/Student/Profile'
import { createResponse } from 'helpers/Response'
import { profileAction, mattersEnrolledAction } from 'store/actions/Student/ProfileActions'
import NavbarStudent from 'components/NavbarStudent'
import TableComponents from 'components/TableComponents'
import Student from 'apis/Student'
import {toastr} from 'react-redux-toastr'
import {
	Button,
	Container,
	Row,
	Col,
  Card,
  Spinner
} from 'react-bootstrap'

export default function StudentProfile() {
	
  const history = useHistory()
  const dispatch = useDispatch();
  const studentProfile = useSelector(state => state.profile);

  const [ profile, setProfile ] = useState(studentProfile.profile);
  const [ loadHorario, setLoadHorario ] = useState(false);
  const [ period, setPeriod ] = useState('')

  const main = useRef()
	const fileHorario = useRef()
	const fileProfile = useRef()

  const handleFileHorarioClick = e => {
    e.preventDefault();
    fileHorario.current.click();
  }

  const handleFileProfileClick = e => {
    e.preventDefault();
    fileProfile.current.click();
  }

  const handleFileHorarioChange = e => {
    e.preventDefault()
    setLoadHorario(true)
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append('horario', file);
    toastr.info('Espera un poco', 'Se está cargando tu horario');
    Student.postHorario(formData)
      .then(response => {
        console.log('success',response.data.message)
        dispatch(mattersEnrolledAction());
        setLoadHorario(false)
        toastr.success('¡Felicidades!', 'El horario se ha cargado con éxito');
        toastr.info('¡Importante!', 'En breve aparecerán tus materias');
      })
      .catch(error => {
        if(error.response.status === 422){
          console.log('error de validacion',error.response.data.message)
          toastr.error('¡Oh no!', error.response.data.message);
        }
        setLoadHorario(false)
      })
  }

  const handleFileProfileChange = e => {
    e.preventDefault();
    const file = e.target.files[0]
    let formData = new FormData();
    formData.append('avatar', file);
    toastr.info('Espera un poco', 'Se está actualizando tu avatar');
    Student.postAvatar(formData)
      .then(response => {
        console.log('success',response.data.message)
        dispatch(profileAction());
        toastr.success('¡Felicidades!', 'Tu avatar se ha actualizado con éxito');
      })
      .catch(error => {
        if(error.response.status === 422){
          console.log('error de validacion',error.response.data.message)
          toastr.error('¡Oh no!', error.response.data.message);
        }else if(error.response.status === 500) {
          toastr.error('¡Oh no!', 'Error inesperado, espera y vuelve a intentarlo.');
        }
      })
  }

  const handleToAbsenceForm = e => {
    e.preventDefault();
    history.push('/estudiante/inasistencias/nueva')
  }

  const getPeriodActive = () => {
    Profile.getPeriodActive()
      .then(resp => {
        const response = createResponse(resp).data.data
        setPeriod(response.period);
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    // main.scrollTop = 0;
  },[])

  useEffect(() => {
    if(studentProfile.loading){
      dispatch(profileAction());
      dispatch(mattersEnrolledAction());
    }
  },[dispatch,studentProfile.loading])

  useEffect(() => {
    setProfile(studentProfile.profile);
  },[studentProfile.profile])
  
  useEffect(() => {
    getPeriodActive()
  },[])

  if (! studentProfile.loading && profile !== null && profile !== "") {
    return(
      <Fragment>
        <NavbarStudent variant="transparent"/>
        <main className="profile-page" ref={main}>
          <section className="section-profile-cover section-shaped my-0">
            {/* Circles background */}
            <div className="shape shape-style-1 shape-default alpha-4">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="section">
            <Container>
              <Card className="card-profile shadow mt--400">
                <div className="px-4">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <div style={{cursor:'pointer'}} onClick={handleFileProfileClick} title="Cambiar avatar">
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={profile.user.avatar}
                            width="180"
                            height="180"
                          />
                        </div>
                        <input
                          type="file"
                          ref={fileProfile}
                          onChange={handleFileProfileChange}
                          style={{display:'none',}}/>
                      </div>
                    </Col>
                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center"
                      lg="4"
                    >
                      <div className="card-profile-actions py-4 mt-lg-0">
                        <Button
                          className="mr-4"
                          variant="danger"
                          href="#pablo"
                          onClick={handleToAbsenceForm}
                          size="sm"
                        >
                          Inf. Ausencia
                        </Button>
                        <input
                          type="file"
                          ref={fileHorario}
                          onChange={handleFileHorarioChange}
                          style={{display:'none',}}/>
                        <Button
                          className="float-right"
                          variant="success"
                          href="#pablo"
                          onClick={handleFileHorarioClick}
                          size="sm"
                        >
                          {loadHorario
                            ? <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                            : null}
                          Subir Horario
                        </Button>
                      </div>
                    </Col>
                    <Col className="order-lg-1" lg="4">
                      <div className="card-profile-stats d-flex justify-content-center">
                        <div>
                          <span className="heading">{ (profile.presents_count > 0) ? profile.presents_count : 'S/R' }</span>
                          <span className="description">Asistencias</span>
                        </div>
                        <div>
                          <span className="heading">{ (profile.absents_count > 0) ? profile.absents_count : 'S/R' }</span>
                          <span className="description">Ausencias</span>
                        </div>
                        <div>
                          <span className="heading">{ (profile.inscriptions_count > 0) ? profile.inscriptions_count : 'S/R' }</span>
                          <span className="description">Materias</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center mt-5">
                    <h3>
                      { `${profile.student.name} ${profile.student.lastname}` }
                    </h3>
                    <div className="h6 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      CI: { profile.student.identity }
                    </div>
                    <div className="h6 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      Period Activo: { period }
                    </div>
                    {/*<div className="h6 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Solution Manager - Creative Tim Officer
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      University of Computer Science
                    </div>*/}
                  </div>
                  <div className="mt-5 py-5 border-top text-center">
                    <Row className="justify-content-center">
                      <Col lg="9">
                        <TableComponents
                          data={studentProfile.matters}
                          headers={[
                            {
                              name: 'CÓDIGO'
                            },
                            {
                              name: 'NOMBRE'
                            },
                            {
                              name: 'SECCIÓN'
                            },
                          ]}
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card>
            </Container>
          </section>
        </main>
      </Fragment>
    )  
  }else{
    return(
      <Fragment>
        <NavbarStudent variant="transparent"/>
        <main className="profile-page" ref={main} >
          <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <Spinner animation="border" variant="primary" />
            Cargando
          </div>
        </main>
      </Fragment>
    )
  }
	
}