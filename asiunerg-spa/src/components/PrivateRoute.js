import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom'

export default function PrivateRoute({ component:Component, ...rest}) {
  const { isAuth } = useSelector(state => state.auth);

  return(
		<Route
			{...rest}
			render={(props) => 
				(isAuth) ? (
					<Component {...props}/>
				) : (
					<Redirect
						to={{
							pathname: '/acceder',
							state: { from: props.location }
						}}
					/>
				)
			}
		/>
	)
}