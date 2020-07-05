import React, { Fragment, useState, useEffect } from 'react'
import NavbarStudent from 'components/NavbarStudent'
import ClassesApi from 'services/Student/Classes'
import { createResponse } from 'helpers/Response'
import makeAnimated from 'react-select/animated'
import Select from 'react-select'
import {toastr} from 'react-redux-toastr'
import {
	Container,
	Row,
	Col,
	Card,
	Spinner,
	Pagination
} from 'react-bootstrap'

const animatedComponents = makeAnimated()

function ClassBox(props) {
	const {
		data
	} = props

	return (
		<Col xs={12} md={5} lg={4} xl={3} className="m-1 my-sm-2">
			<Card className="shadow">
				<Card.Header className="p-3 text-center font-weight-bold text-uppercase">
					{data.matter.name}
				</Card.Header>
				<Card.Body>
					<Row className="px-2">
						<Col xs={12}>
							<div>
								Tema impartido:
							</div>
							<p>{data.theme}</p>
						</Col>
						<Col xs={12}>
							<div>
								<span className="text-danger">Obsevación:</span>	
							</div>
							<p>{data.observation}</p>
						</Col>
						<Col xs={12} className="float-right">
							<div><span className="text-danger">Fecha: </span>2020-06-14</div>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</Col>
	)
}

export default function Classes() {

	const [ links, setLinks ] = useState({});
	const [ page, setPage ] = useState(null);
	const [ loading, setLoading ] = useState(true)
	const [ classes, setClasses ] = useState([])
	const [ classesView, setClassesView ] = useState([])
	const [ matters, setMatters ] = useState([])
	const [ fields, setFields ] = useState({
		matters : null
	})

	const handleGetClasses = (type) => {
		if(type === 'next' && links.next !== null) {
			setPage((page + 1))
		}else if(type === 'prev' && links.prev !== null) {
			setPage((page - 1))
		}else{
			return;
		}
		getHistoryClass(page)
	}

	const getHistoryClass = (number) => {
		setLoading(true)
		toastr.info('Espera un poco', 'Se están buscando tus clases.');
		ClassesApi.getClasses(number)
		.then(resp => {
			const response = createResponse(resp).data;
			setClasses(response.data)
			setClassesView(response.data)
			let hash = {};
			setMatters(response.data.map(repo => ({
				value: repo.matter.code,
				label: repo.matter.name_avr
			})).filter(o => hash[o.value] ? false : hash[o.value] = true))
			setLoading(false)
			setLinks(response.links)
			toastr.success('¡Listo!', 'Ya puedes proceder a ver tus clases.');
		})
		.catch(error => {
			console.log(error)
			setLoading(false)
			toastr.error('¡Oh no!', error.response.data.message);
		})
	}

	useEffect(() => {
		getHistoryClass()
	},[])

	useEffect(() => {
		if(fields.matters !== null && fields.matters.length > 0){
			setClassesView(classes.filter(classe => fields.matters.includes(classe.matter.code)))
		}else{
			setClassesView(classes)
		}
	},[fields, classes])

	const renderHistoryClass = () => {
		return (
			<Container>
				<Row className="justify-content-center">
					<Col xs={12} md={10} className="py-4 px-5 mx-md-2">
						<Card body className="shadow">
							<Select
								className="input-group-alternative"
								placeholder="Filtra por materias.."
								components={animatedComponents}
								isMulti
								value={(fields.matters === null) ? fields.matters : undefined}
								onChange={e => setFields({...fields, matters: e && e.map(val => val.value)})}
								options={matters}
							/>
						</Card>
					</Col>
					{
						classesView.length > 0
						? classesView.map(classe => (
								<ClassBox key={classe.id} data={classe}/>
							))
						: <h1 className="text-danger text-center">No existen clases registradas.</h1>
					}
					<Col xs={12} className="m-1 mt-5 text-center">
					{links.prev === null && links.next === null
						? <div>No hay mas ausencias informadas.</div>
						: <Pagination size="lg" className="d-flex justify-content-center">
							<Pagination.Prev disabled={links.prev === null} onClick={() => handleGetClasses('prev')} />
							<Pagination.Next disabled={links.next === null} onClick={() => handleGetClasses('next')} />
							</Pagination>
       				}
					</Col>
				</Row>
			</Container>
		)
	}

	return(
		<Fragment>
			<NavbarStudent variant="absolute"/>
			<main>
				<section className="section section-lg">
					{loading
						? <div className="d-flex flex-column justify-content-center align-items-center">
							<Spinner animation="border" variant="primary" />
							Cargando
						</div>
						: renderHistoryClass()
					}
				</section>
			</main>
		</Fragment>
	)
}