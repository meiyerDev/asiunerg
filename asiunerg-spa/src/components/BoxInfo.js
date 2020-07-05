import React/* , { Fragment, useState } */ from 'react'
import {
	Card,
	Col,
	Image,
	// Button,
	// Dropdown
} from 'react-bootstrap'

export default function BoxInfo(props){
	const {
		data
	} = props;

	// const [ showReason, setShowReason ] = useState(false)
	return(
		<Card body className="mb-2">
			<Col sm={12} className="row">
				<Image
					src={data.avatar ?? require("assets/img/brand/ais_logo.jpg")}
					roundedCircle
					style={{height:80, width: 90}}
					className="d-none d-md-block responsive float-left"
					/>
				<Col xs={10} md={7} lg={9} className="mr-1">
					<h5 className="mb-n1">{data.name}</h5>
					<p className="mb-n1">Materia: {data.matter}</p>
					<p><span className="text-danger">Fecha:</span> {data.date_asistent}</p>
				</Col>
				{/* <Col xs={1} md={2} lg={1} className="justify-content-center align-items-center text-center">
					{	data.reason !== "" || data.reason !== null
						? <Button
								onClick={() => setShowReason(!showReason)}
								className="btn-icon"
								variant="outline-warning">
								<span className="btn-inner--icon">
		              <i className="fa fa-eye" />
		            </span>
							</Button>
						: null
					}
				</Col> */}
			</Col>
			{/* { showReason ? (
					<Fragment>
						<Dropdown.Divider></Dropdown.Divider>
						<p className="mb-n2"><span className="text-danger">Motivo:</span> {data.reason}</p>
					</Fragment>
				): null
			} */}
			
		</Card>
	)
}