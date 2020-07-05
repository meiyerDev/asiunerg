import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { checkAuth } from 'store/actions/Auth/AuthActions'
import {
	BrowserRouter as Router,
} from 'react-router-dom'
import Routes from 'Routes';
import ReduxToastr from 'react-redux-toastr'

class App extends Component {

	UNSAFE_componentWillMount() {
		if (this.props.isAuth && this.props.role.length === 0) {
			this.props.checkAuth();
		}
	}

	render() {
		return (
			<Fragment>
				<Router>
					<Routes />
				</Router>
				<ReduxToastr
					timeOut={4000}
					newestOnTop={false}
					preventDuplicates
					position="top-right"
					getState={(state) => state.toastr} // This is the default
					transitionIn="fadeIn"
					transitionOut="fadeOut"
					progressBar
					closeOnToastrClick />
			</Fragment>
		)
	}
}

const mapStateToProps = state => ({
	role: state.auth.role,
	isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { checkAuth })(App);