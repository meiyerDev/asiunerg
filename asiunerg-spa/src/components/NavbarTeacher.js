import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { LogOutAction } from 'store/actions/Auth/AuthActions'
import { Link } from "react-router-dom"
import Headroom from "headroom.js"
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap"

export default function NavbarTeacher(props) {
  const {
    variant
  } = props;
  
  const dispatch = useDispatch();
  const authLoading = useSelector(state => state.auth.loading);

	const [ collapseClasses, setCollapseClasses ] = useState('')

	const onExiting = () => {
		setCollapseClasses('collapsing-out')
	}

	const onExited = () => {
		setCollapseClasses('')
	}

  const logout = () => {
    dispatch(LogOutAction());
  }

	useEffect(() => {
		const headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
	},[])

	return(
		<Fragment>
      <header className="header-global">
        <Navbar
          className={`navbar-main navbar-${variant} navbar-dark bg-primary headroom`}
          expand="lg"
          id="navbar-main"
        >
          <Container>
            <NavbarBrand className="mr-lg-3" to="/" tag={Link}>
              <img
                alt="..."
                src={require("assets/img/brand/asiunerg-white.png")}
              />
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar_global">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse
              toggler="#navbar_global"
              navbar
              className={collapseClasses}
              onExiting={onExiting}
              onExited={onExited}
            >
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      <img
                        alt="..."
                        src={require("assets/img/brand/asiunerg-black.png")}
                      />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button className="navbar-toggler" id="navbar_global">
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                <NavItem>
                  <NavLink tag={Link} to="/">
                    Inicio
                  </NavLink>
                </NavItem>
                <UncontrolledDropdown nav>
                  <DropdownToggle nav>
                    <i className="ni ni-collection d-lg-none mr-1" />
                    <span className="nav-link-inner--text">Inasistencias</span>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem to="/profesor/inasistencias/nueva" tag={Link}>
                      Informar Nueva
                    </DropdownItem>
                    <DropdownItem to="/profesor/inasistencias" tag={Link}>
                      Mis Inasistencias
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  <NavLink to="/profesor/clases/materias" tag={Link}>
                    Clases
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/profesor/perfil">
                    Perfil
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="align-items-lg-center ml-lg-auto" navbar>
                <NavItem className="d-none d-lg-block ml-lg-4">
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    onClick={logout}
                    disabled={authLoading}
                  >
                    <span className="btn-inner--icon">
                      <i className="fa fa-sign-out mr-2" />
                    </span>
                    <span className="nav-link-inner--text ml-1">
                      { authLoading ? 'Espere..' : 'Cerrar Sesión' }
                    </span>
                  </Button>
                </NavItem>
                <NavItem className="d-lg-none text-right ml-lg-4">
                  <Button
                    className="btn-icon"
                    color="warning"
                    onClick={logout}
                    disabled={authLoading}
                  >
                    <span className="btn-inner--icon">
                      <i className="fa fa-sign-out mr-2" />
                    </span>
                    <span className="nav-link-inner--text ml-1">
                      { authLoading ? 'Espere..' : 'Cerrar Sesión' }
                    </span>
                  </Button>
                </NavItem>

              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </header>
    </Fragment>
	)
}