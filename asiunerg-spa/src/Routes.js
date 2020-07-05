import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import PublicRoute from 'components/PublicRoute'
import PrivateRoute from 'components/PrivateRoute'
import StudentPrivateRoutes from 'StudentPrivateRoutes'
import TeacherPrivateRoutes from 'TeacherPrivateRoutes'

import Login from 'views/auth/Login'
import SignUp from 'views/auth/SignUp'
import Dashboard from 'views/Dashboard'

import { Gaurd } from 'Gaurd'

const Routes = (props) => {
    return (
      <Switch>
        
        <Route  exact path="/" render={ props=>(
          <Redirect to={{pathname: '/acceder'}} />
        )} />
        
        <PublicRoute path="/acceder" exact name="login" component={Login}/>
        <PublicRoute path="/registrar" exact name="signup" component={SignUp}/>
        <PrivateRoute path="/inicio" exact component={Dashboard} />
        
        <Gaurd  path="/estudiante"
          roleRoute='Student'
          routeRedirect='/acceder'
          component={StudentPrivateRoutes}
        />
        <Gaurd  path="/profesor"
          roleRoute='Teacher'
          routeRedirect='/acceder'
          component={TeacherPrivateRoutes}
        />
      </Switch>
    );
}

export default Routes;
