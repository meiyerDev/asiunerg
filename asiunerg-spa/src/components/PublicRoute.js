import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

export default function PublicRoute({ component:Component, ...rest}) {
  const isAuth = useSelector(state => state.auth.isAuth);
	return(
		<Route
			{...rest}
			render={(props) => 
				!isAuth ? (
					<Component {...props}/>
				) : (
					<Redirect
						to={{
							pathname: '/inicio',
							state: { from: props.location }
						}}
					/>
				)
			}
		/>
	)
}