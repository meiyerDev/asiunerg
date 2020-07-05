import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export  const Gaurd = ({ component: Component, roleRoute,routeRedirect, ...rest}) => {
  const { isAuth/*, roleSelected*/ } = useSelector(state => state.auth);
  
  return(
    <Route {...rest} render={props => (
      (isAuth /*&& roleSelected === roleRoute*/ )
        ? <Component {...props} />
        : <Redirect to={{
        		pathname: routeRedirect,
        		state: { from: props.location }
        	}} />
    )} />
  );
}
