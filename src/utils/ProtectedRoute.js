  
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from './Auth';
import { asset_url } from '../utils/Config'

class ProtectedRoute extends React.Component {

	isAuthorized = (only) => {
		if (only === "admin") {
            return Auth.isUserAdmin();
        } else if (only === "member"){
            return Auth.isUserMember();

        } else {
            return Auth.isUserAuthenticated();
        }
	}

	render() {
		const { auth, only, component: Component, ...routeProps } = this.props;
		const redirection = asset_url('/login?redirect=' + this.props.location.pathname);
		return (
			<Route
				{...routeProps} 
				render={props => (this.isAuthorized(only)
					? <Component {...props} />
					: <Redirect to={redirection} />
				)}
			/>
		);
    }
    
}

ProtectedRoute.defaultProps = {
	// only: 'member',
	// redirection: '/login',
}

export default ProtectedRoute;