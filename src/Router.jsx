import React, {Component} from 'react';
import { HashRouter,Switch, Route, Redirect } from 'react-router-dom';

import HomePage from './pages/HomePage';
import NewGame from './pages/NewGame';
import Login from './pages/Login';
import Signup from './pages/Signup';

import Auth from './Auth';

const Router = (props) => (
  
    <HashRouter>
    <Switch>
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/" component={HomePage} />
      <PrivateRoute path="/new-game/:handle" component={NewGame} />
    </Switch>
    </HashRouter>
  
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.getAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      )
    }
  />
);


export default Router;