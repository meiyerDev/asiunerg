import React, { Fragment, useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import NavbarStudent from 'components/NavbarStudent'
import NavbarTeacher from 'components/NavbarTeacher'
import {
  Container,
  Col,
  Row,
  Badge,
  Button,
  Card,
  CardBody,
  CardImg
} from 'reactstrap'

export default function SignUp() {
  const history = useHistory()

  const { roleSelected, role } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (role.length > 0) {
      setLoading(false)
    }
  }, [role.length])

  const handleToAbsenceForm = e => {
    e.preventDefault();
    if(roleSelected === "Student") {
      history.push('/estudiante/inasistencias/nueva')
    }else{
      history.push('/profesor/inasistencias/nueva')
    }
  }

  const handleToProfile = e => {
    e.preventDefault();
    if(roleSelected === "Student") {
      history.push('/estudiante/perfil')
    }else{
      history.push('/profesor/perfil')
    }
  }

  return (
    <Fragment>
      {(!loading)
        ? roleSelected === "Student"
          ? <NavbarStudent variant="transparent" />
          : roleSelected === "Teacher"
            ? <NavbarTeacher variant="transparent" />
            : null
        : null
      }
      <main>
        <div className="position-relative">
          {/* shape Hero */}
          <section className="section section-lg section-shaped pb-250">
            <div className="shape shape-style-1 shape-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="py-lg-md d-flex">
              <div className="col px-0">
                <Row>
                  <Col lg="6">
                    <h1 className="display-2 text-white">
                      Solución Tecnológica{" "}
                      <span className="h4 text-white">para el informe asistencial</span>
                    </h1>
                    <blockquote className="blockquote text-white">
                      <p className="mb-0 lead">
                        " Un maestro es una brújula que activa los imanes
                        de la curiosidad, el conocimiento y la sabiduría
                        en los alumnos. "
                      </p>
                      <footer className="blockquote-footer text-white">Dicho por <cite title="Autor">Ever Garrisson</cite></footer>
                    </blockquote>
                    <div className="btn-wrapper">
                      <Button
                        className="btn-icon mb-3 mb-sm-0"
                        color="info"
                        onClick={handleToProfile}
                      >
                        <span className="btn-inner--icon mr-1">
                          <i className="ni ni-single-02" />
                        </span>
                        <span className="btn-inner--text">Mi Perfil</span>
                      </Button>
                      <Button
                        className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
                        color="default"
                        onClick={handleToAbsenceForm}
                      >
                        <span className="btn-inner--icon mr-1">
                          <i className="ni ni-bell-55" />
                        </span>
                        <span className="btn-inner--text">
                          Informar Ausencias
                        </span>
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
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
          {/* 1st Hero Variation */}
        </div>
        <section className="section section-lg pt-lg-0 mt--200">
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <Row className="row-grid">
                  {!loading
                    ? roleSelected === "Student"
                      ? <Col lg="4">
                        <Card className="card-lift--hover shadow border-0">
                          <CardBody className="py-5">
                            <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                              <i className="ni ni-cloud-upload-96" />
                            </div>
                            <h6 className="text-primary text-uppercase">
                              Carga tu Horario
                                </h6>
                            <p className="description mt-3">
                              <span className="font-weight-bold">¡ Asiunerg valida que el horario cargado te pertenezca ! </span>
                                  Por favor, verifica antes de subirlo para no ocasionar
                                  molestias.
                                </p>
                            <p>- La administración</p>
                            <div>
                              <Badge color="primary" pill className="mr-1">
                                rápido
                                  </Badge>
                              <Badge color="primary" pill className="mr-1">
                                seguro
                                  </Badge>
                              <Badge color="primary" pill className="mr-1">
                                requerido
                                  </Badge>
                            </div>
                            <Button
                              className="mt-4"
                              color="primary"
                              onClick={handleToProfile}
                            >
                              Cargar Horario
                            </Button>
                          </CardBody>
                        </Card>
                      </Col>
                      : null
                    : null
                  }
                  <Col lg={roleSelected === "Student" ? "4" : "6"}>
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                          <i className="ni ni-notification-70" />
                        </div>
                        <h6 className="text-success text-uppercase">
                          Informa tus ausencias
                          </h6>
                        <p className="description mt-3 mb-0">
                          <span className="font-weight-bold">¡Recuerda!</span> a todos nos disgusta esperar,
                            <span className="font-weight-bold">y peor</span> si la persona que esperas no llega.
                          </p>
                        <p className="description mt-3">
                          <span className="font-weight-bold">Informa tu ausencia académica</span> para evitar
                            molestias a los interesados.
                          </p>
                        <div>
                          <Badge color="success" pill className="mr-1">
                            Informa
                            </Badge>
                          <Badge color="success" pill className="mr-1">
                            Asegura
                            </Badge>
                          <Badge color="success" pill className="mr-1">
                            se feliz
                            </Badge>
                        </div>
                        <Button
                          className="mt-4"
                          color="success"
                          onClick={handleToAbsenceForm}
                        >
                          informar ausencia
                          </Button>
                      </CardBody>
                    </Card>
                  </Col>
                  {!loading
                    ? roleSelected === "Student"
                      ? <Col lg="4">
                        <Card className="card-lift--hover shadow border-0">
                          <CardBody className="py-5">
                            <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                              <i className="ni ni-paper-diploma" />
                            </div>
                            <h6 className="text-warning text-uppercase">
                              Buscas tus clases
                            </h6>
                            <p className="description mt-3 mb-0">
                              infórmate de lo que te has perdido o recuerda lo que has olvidado.
                            </p>
                            <p className="description mt-3">
                              ¡<span className="font-weight-bold">Tu éxito académico</span> depende de no
                              perderte de nada!.
                            </p>

                            <div>
                              <Badge color="warning" pill className="mr-1">
                                Encuentralas
                              </Badge>
                              <Badge color="warning" pill className="mr-1">
                                informate
                              </Badge>
                              <Badge color="warning" pill className="mr-1">
                                estudia
                              </Badge>
                            </div>
                            <Button
                              className="mt-4"
                              color="warning"
                              onClick={e => history.push('/estudiante/clases')}
                            >
                              Ver clases
                            </Button>
                          </CardBody>
                        </Card>
                      </Col>
                      : <Col lg="6">
                        <Card className="card-lift--hover shadow border-0">
                          <CardBody className="py-5">
                            <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                              <i className="ni ni-paper-diploma" />
                            </div>
                            <h6 className="text-warning text-uppercase">
                              Marca tu asistencia
                              </h6>
                            <p className="description mt-3 mb-0">
                              ¡ La administración necesita saber que asististe a clases !
                              </p>
                            <p className="description mt-3 mb-3">
                              Tus alumnos lo saben y tu lo sabes pero, ¿<span className="font-weight-bold">la administración</span> saben de ello?
                                informa tu asistencia y ¡has conocer que estudiantes asistieron hoy!.
                              </p>
                            <div>
                              <Badge color="warning" pill className="mr-1">
                                Informalas
                                </Badge>
                              <Badge color="warning" pill className="mr-1">
                                rapido
                                </Badge>
                              <Badge color="warning" pill className="mr-1">
                                requerido
                                </Badge>
                            </div>
                            <Button
                              className="mt-4"
                              color="warning"
                              onClick={e => history.push('profesor/clases/materias')}
                            >
                              informar clase
                            </Button>
                          </CardBody>
                        </Card>
                      </Col>
                    : null
                  }
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section section-lg mt--100">
          <Container>
            <Row className="row-grid align-items-center">
              <Col className="order-md-2" md="6">
                <img
                  alt="..."
                  className="img-fluid floating shadow"
                  src={require("assets/img/theme/promo-1.png")}
                />
              </Col>
              <Col className="order-md-1" md="6">
                <div className="pr-md-5">
                  <div className="icon icon-lg icon-shape icon-shape-success shadow rounded-circle mb-5">
                    <i className="ni ni-bell-55" />
                  </div>
                  <h3>Asombrosamente Fácil</h3>
                  <p>
                    Una vez te encuentres en el <span className="font-weight-bold">Formulario de informe de ausencia </span>
                    deberas seguir las siguientes instrucciones:
                  </p>
                  <ul className="list-unstyled mt-3">
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge
                            className="badge-circle mr-3"
                            color="success"
                          >
                            <i className="ni ni-archive-2" />
                          </Badge>
                        </div>
                        <div>
                          <h6 className="mb-0">
                            Selecciona el tipo de ausencia ( por dia o materia ).
                          </h6>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge
                            className="badge-circle mr-3"
                            color="success"
                          >
                            <i className="ni ni-calendar-grid-58" />
                          </Badge>
                        </div>
                        <div>
                          <h6 className="mb-0">Selecciona el dia o la materia correspondiente.</h6>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge
                            className="badge-circle mr-3"
                            color="success"
                          >
                            <i className="ni ni-satisfied" />
                          </Badge>
                        </div>
                        <div>
                          <h6 className="mb-0">
                            Selecciona un motivo y escribe una pequeña observación.
                          </h6>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section bg-secondary">
          <Container>
            <Row className="row-grid align-items-center">
              <Col md="6">
                <Card className="bg-default shadow border-0">
                  <CardImg
                    alt="..."
                    src={require("assets/img/theme/img-1-1200x1000.jpg")}
                    top
                  />
                  <blockquote className="card-blockquote">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-bg"
                      preserveAspectRatio="none"
                      viewBox="0 0 583 95"
                    >
                      <polygon
                        className="fill-default"
                        points="0,52 583,95 0,95"
                      />
                      <polygon
                        className="fill-default"
                        opacity=".2"
                        points="0,42 583,95 683,0 0,95"
                      />
                    </svg>
                    <h4 className="display-3 font-weight-bold text-white text-uppercase">
                      tu propio perfil
                    </h4>
                    <p className="lead text-italic text-white">
                      Con tu información asistencial académica actual,
                      en espera por ser llenado y ocupado por tu vida
                      como {roleSelected === "Student" ? 'Estudiante' : 'Profesor'}.
                    </p>
                  </blockquote>
                </Card>
              </Col>
              <Col md="6">
                <div className="pl-md-5">
                  <div className="icon icon-lg icon-shape icon-shape-warning shadow rounded-circle mb-5">
                    <i className="ni ni-single-02" />
                  </div>
                  <h3>En tu Perfil puedes</h3>
                  <p className="lead">
                    Ver actualmente cual es el número de ausencias
                    académicas acumuladas.
                  </p>
                  <p>
                    Conocer de igual manera tu número de asistencias
                    académicas acumuladas.
                  </p>
                  {roleSelected === "Student"
                    ? <p>
                      Tener conocimiento pleno de la cantidad de materias
                      que has cursado desde que comenzaste a utilizar
                      esta asombrosa aplicación.
                      </p>
                    : null
                  }
                  <a
                    className="font-weight-bold text-warning mt-5"
                    href="#perfil"
                    onClick={handleToProfile}
                  >
                    ¡Vayamos a conocer tu perfil ahora!
                  </a>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section pb-0 bg-gradient-warning">
          <Container>
            <Row className="row-grid align-items-center">
              <Col className="order-lg-2 ml-lg-auto" md="6">
                <div className="position-relative pl-md-5">
                  <img
                    alt="..."
                    className="img-center img-fluid"
                    src={require("assets/img/ill/ill-2.svg")}
                  />
                </div>
              </Col>
              <Col className="order-lg-1" lg="6">
                <div className="d-flex px-3">
                  <div>
                    <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                      <i className="ni ni-settings text-primary" />
                    </div>
                  </div>
                  <div className="pl-4">
                    <h4 className="display-3 text-white">Acciones Requeridas</h4>
                    <p className="text-white">
                      Antes de iniciar a ser feliz por el tiempo
                      y las molestias ahorradas gracias al uso de esta
                      aplicación, requerimos que:
                    </p>
                  </div>
                </div>
                {roleSelected === "Student"
                  ? <Card className="shadow shadow-lg--hover mt-5">
                    <CardBody>
                      <div className="d-flex px-3">
                        <div>
                          <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                            <i className="ni ni-cloud-upload-96" />
                          </div>
                        </div>
                        <div className="pl-4">
                          <h5 className="title text-success">
                            Cargar tu horario
                        </h5>
                          <p>
                            Asiunerg lo hace todo, tu solo carga tu horario
                            académico y nosotros nos encargaremos del resto
                          <span className="font-weight-bold"> ¡ AL INSTANTE !</span>
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  : null
                }
                <Card className="shadow shadow-lg--hover mt-5">
                  <CardBody>
                    <div className="d-flex px-3">
                      <div>
                        <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                          <i className="ni ni-active-40" />
                        </div>
                      </div>
                      <div className="pl-4">
                        <h5 className="title text-warning">
                          Actualiza tu avatar
                        </h5>
                        <p>
                          Recuerda, la identificación personal es tan importante
                          como el saber. ¡Por favor! actualiza tu avatar con
                          una ¡hermosa selfie!, ya sabemos que tu sonrisa es hermosa,
                          ahora ¡muestrasela a todos!
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
          {/* SVG separator */}
          <div className="separator separator-bottom separator-skew zindex-100">
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
        <section className="section section-lg">
          <Container>
            <Row className="row-grid align-items-center">
              <Col className="order-md-2" md="6">
                <img
                  alt="..."
                  className="img-fluid floating"
                  src={require("assets/img/theme/cambiar-avatar.gif")}
                />
              </Col>
              <Col className="order-md-1" md="6">
                <div className="pr-md-5">
                  <div className="icon icon-lg icon-shape icon-shape-success shadow rounded-circle mb-3">
                    <i className="ni ni-camera-compact" />
                  </div>
                  <h3>Hora de cambiar tu avatar</h3>
                  <ul className="list-unstyled mt-3">
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge
                            className="badge-circle mr-3"
                            color="success"
                          >
                            <i className="ni ni-single-02" />
                          </Badge>
                        </div>
                        <div>
                          <h6 className="mb-0">
                            Ve directo a tu
                            <a
                              className="font-weight-bold text-success mt-5"
                              href="#perfil"
                              onClick={handleToProfile}
                            > perfil</a>
                          </h6>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge
                            className="badge-circle mr-3"
                            color="success"
                          >
                            <i className="ni ni-active-40" />
                          </Badge>
                        </div>
                        <div>
                          <h6 className="mb-0">Haz un click en el avatar actual</h6>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge
                            className="badge-circle mr-3"
                            color="success"
                          >
                            <i className="ni ni-satisfied" />
                          </Badge>
                        </div>
                        <div>
                          <h6 className="mb-0">
                            Escoge esa asombrosa selfie de tus archivos
                          </h6>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section bg-gradient-default">
          <Container className="">
            <Row className="text-center justify-content-center">
              <Col lg="12">
                <p className="font-weight-bold text-white">HECHO POR MEIYER JAIMES <a target="_blank" rel="noopener noreferrer" href="https://github.com/themey99">@THEMEY99</a> - UNIVERSIDAD NACIONAL EXPERIMENTAL RÓMULO GALLEGOS</p>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </Fragment>
  )
}
