import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import Profile from 'views/teacher/Profile'
import AbsenceFormPage from 'views/teacher/AbsenceFormPage'
import AbsencePage from 'views/teacher/AbsencePage'
import MattersPage from 'views/teacher/MattersPage'
import StudentsMatterList from 'views/teacher/StudentsMatterList'
import ClassesForm from 'views/teacher/ClassesForm'

export default function TeacherPrivateRoutes(props) {
  return (
    <div>
      <Switch>
        <Route exact path={`${props.match.path}/perfil`}  component={Profile} />
        <Route exact path={`${props.match.path}/inasistencias`}  component={AbsencePage} />
        <Route exact path={`${props.match.path}/inasistencias/nueva`}  component={AbsenceFormPage} />
        <Route exact path={`${props.match.path}/clases/materias`}  component={MattersPage} />
        <Route exact path={`${props.match.path}/clases/materia/:id`}  component={StudentsMatterList} />
        <Route exact path={`${props.match.path}/clases/materia/finalizar/:id`}  component={ClassesForm} />
        <Route  exact path={props.match.path} render={ props=>(
          <Redirect to={{pathname: `${props.match.path}/perfil` }} />
        )} />
      </Switch>     
    </div>
  )
}
