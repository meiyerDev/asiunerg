import React, { Fragment, useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Profile from 'services/Teacher/Profile'
import { createResponse } from 'helpers/Response'
import { profileAction, matterAssignAction } from 'store/actions/Teacher/ProfileActions'
import NavbarTeacher from 'components/NavbarTeacher'
import TableComponents from 'components/TableComponents'
import Teacher from 'apis/Teacher'
import {toastr} from 'react-redux-toastr'
import {
	Button,
	Container,
	Row,
	Col,
	Card
} from 'react-bootstrap'

export default function TeacherProfile() {
	
  const dispatch = useDispatch();
  const history = useHistory();
  const teacherProfile = useSelector(state => state.profile);

  const [ profile, setProfile ] = useState(teacherProfile.profile);
  const [ period, setPeriod ] = useState('');

  const main = useRef()
	const fileAvatar = useRef()

  const handleFileAvatarClick = e => {
    e.preventDefault();
    fileAvatar.current.click();
  }

  const handleFileAvatarChange = e => {
    e.preventDefault()
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append('avatar', file);
    Teacher.postAvatar(formData)
    .then(response => {
      console.log('success',response.data.message)
      dispatch(profileAction());
      toastr.success('Felicidades', 'Tu avatar se ha actualizado con éxito');
    })
    .catch(error => {
      if(error.response.status === 422){
        console.log('error de validacion',error.response.data.message)
        toastr.error('¡Oh no!', error.response.data.message);
      }
    })
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
    if(teacherProfile.loading){
      dispatch(profileAction());
      dispatch(matterAssignAction());
    }
  },[dispatch,teacherProfile.loading])

  useEffect(() => {
    setProfile(teacherProfile.profile);
  },[teacherProfile.profile])

  useEffect(() => {
    getPeriodActive()
  },[])

  if (! teacherProfile.loading && profile !== null && profile !== "") {
    return(
      <Fragment>
        <NavbarTeacher variant="transparent"/>
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
                        <input
                          type="file"
                          ref={fileAvatar}
                          onChange={handleFileAvatarChange}
                          style={{display:'none',}}/>

                        <a href="#asiunerg" onClick={handleFileAvatarClick}>
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={profile.user.avatar}
                          />
                        </a>
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
                          onClick={e => history.push('/profesor/inasistencias/nueva')}
                          size="sm"
                        >
                          INF AUSENCIAS
                        </Button>
                        <Button
                          className="float-right"
                          variant="success"
                          size="sm"
                          onClick={e => history.push('/profesor/clases/materias')}
                        >
                          INF ASISTENCIA
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
                        {/*<div>
                          <span className="heading">{ (profile.inscriptions_count > 0) ? profile.inscriptions_count : 'S/R' }</span>
                          <span className="description">Materias</span>
                        </div>*/}
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center mt-3 mt-md-5">
                    <h3>
                      { `${profile.teacher.name} ${profile.teacher.lastname}` }
                    </h3>
                    <div className="h6 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      { profile.teacher.email ?? profile.user.email }
                    </div>
                    <div className="h6 mt-2">
                      <i className="ni business_briefcase-24 mr-2" />
                      { profile.teacher.phone ?? 'Sin teléfono registrado' }
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      Periodo activo: { period }
                    </div>
                  </div>
                  <div className="mt-5 py-5 border-top text-center">
                    <Row className="justify-content-center">
                      <Col lg="9">
                        <TableComponents
                          data={teacherProfile.matters}
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
        <NavbarTeacher variant="transparent"/>
        <main className="profile-page" ref={main}>
          Cargando..
        </main>
      </Fragment>
    )
  }
	
}