import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import { useUser } from '../context/User';
import { RouteProps } from "react-router";
const PrivateRoute:React.FC<IPrivateRoute>= ({ component: Component, ...rest }) => {
	const {user}=useUser();

	return <Route {...rest} render={(props) => (!user ? <Redirect to="/login" /> : <Component {...props} />)} />;
};

export interface IPrivateRoute extends RouteProps {
	component?: any;
  }

export default PrivateRoute;
