import React, { Fragment, useState, useEffect } from 'react'
import NavbarStudent from 'components/NavbarStudent'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import { studentAbsencesAction, deleteAbsenceAction } from 'store/actions/Student/AbsenceActions'
import {
  Table,
  Button,
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Pagination
} from 'react-bootstrap'

export default function AbsencePage() {

  const history = useHistory()
  const dispatch = useDispatch()
  const absencesStudent = useSelector(state => state.absences)

  const [absences, setAbsences] = useState(absencesStudent.absences);
  const [loading, setLoading] = useState(absencesStudent.loading);
  const [links, setLinks] = useState(absencesStudent.metaAbsences);
  const [page, setPage] = useState(null);
  const headers = [
    { name: 'CÓDIGO' },
    { name: 'NOMBRE' },
    { name: 'SECCIÓN' },
    { name: 'FECHA INASISTENCIA' },
    { name: 'FECHA INFORMADA' },
    { name: 'ACCION' }
  ];

  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteAbsenceAction(id))
  }

  const handleGetAbsences = (type) => {
    console.log('ejecutando')
    if(type === 'next' && links.next !== null) {
      setPage((page + 1))
    }else if(type === 'prev' && links.prev !== null) {
      setPage((page - 1))
    }else{
      return;
    }
    dispatch(studentAbsencesAction(page))
  }

  useEffect(() => {
    if (absences.length === 0) {
      dispatch(studentAbsencesAction())
    }
  }, [dispatch, absences.length])

  useEffect(() => {
    setAbsences(absencesStudent.absences)
  }, [absencesStudent.absences])

  useEffect(() => {
    setLoading(absencesStudent.loading)
  }, [absencesStudent.loading])

  useEffect(() => {
    setLinks(absencesStudent.metaAbsences)
  }, [absencesStudent.metaAbsences])

  const renderTableAbsences = () => {
    return (
      <Fragment> 
        <Table responsive striped hover>
          <thead>
            <tr>
              {
                headers.map(header => (
                  <th key={header.name}>{header.name}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {absences.map(row => (
              <tr key={row.id}>
                <td>{row.code}</td>
                <td>{row.name}</td>
                <td>{row.section}</td>
                <td>{row.date_absence}</td>
                <td>{row.date_created}</td>
                <td>
                  {(row.show_trash)
                    ? <Button
                      onClick={e => handleDelete(e, row.id)}
                      className="btn-icon"
                      title="Eliminar inasistencia"
                      variant="danger">
                      <span className="btn-inner--icon">
                        <i className="fa fa-trash" />
                      </span>
                    </Button>
                    : null /* <Button
                      className="btn-icon"
                      title={row.show_class ? "Ver clase" : "La clase no fue registrada"}
                      disabled={!row.show_class}
                      onClick={() => history.push(`/estudiante/clases/${row.class_id}`)}
                      variant="info">
                      <span className="btn-inner--icon">
                        <i className="fa fa-eye" />
                      </span>
                    </Button> */
                  }
                </td>
              </tr>
            ))
            }
          </tbody>
        </Table>
        {links.prev === null && links.next === null
          ? <div>No hay mas ausencias informadas.</div>
          : <Pagination size="lg" className="d-flex justify-content-center">
              <Pagination.Prev disabled={links.prev === null} onClick={() => handleGetAbsences('prev')} />
              <Pagination.Next disabled={links.next === null} onClick={() => handleGetAbsences('next')} />
            </Pagination>
        }
      </Fragment>
    )
  }

  return (
    <Fragment>
      <NavbarStudent variant="absolute" />
      <main>
        <section className="section section-lg">
          <Container>
            <Row>
              <Col className="mx-auto py-3">
                <Card body className="input-group-alternative-border">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="mr-2">Listado de Inasistencias</h2>
                    <Button
                      onClick={() => history.push('/estudiante/inasistencias/nueva')}
                      className="btn-icon"
                      title="Nueva Inasistencia"
                      variant="success">
                      <span className="btn-inner--icon">
                        <i className="fa fa-plus" />
                      </span>
                    </Button>
                  </div>
                  {loading
                    ? <div className="d-flex flex-column justify-content-center align-items-center">
                        <Spinner animation="border" variant="primary" />
                          Cargando
                      </div>
                    : renderTableAbsences()
                  }
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </Fragment>
  )
}