import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'

import AbsencePage from 'views/student/AbsencePage'
import TeacherAbsencePage from 'views/student/TeacherAbsencePage'
import AbsenceFormPage from 'views/student/AbsenceFormPage'
import StudentProfile from 'views/student/StudentProfile'
import Classes from 'views/student/Classes'


export default function StudentPrivateRoutes(props) {
    return (
        <div>
            <Switch>
                <Route exact path={`${props.match.path}/perfil`}  component={StudentProfile} />
                <Route exact path={`${props.match.path}/inasistencias`}  component={AbsencePage} />
                <Route exact path={`${props.match.path}/inasistencias/profesor`}  component={TeacherAbsencePage} />
                <Route exact path={`${props.match.path}/inasistencias/nueva`}  component={AbsenceFormPage} />
                <Route exact path={`${props.match.path}/clases`}  component={Classes} />
                
                <Route path={props.match.path} render={ props=>(
                   <Redirect to={{pathname: `${props.match.path}/perfil` }} />
                     )} />
            </Switch>     
        </div>
    )
}
