import React from 'react';
import { HashRouter,Route, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage';
import NewGame from './pages/NewGame';
import Login from './pages/Login';


export default class App extends React.Component {

  render () {
  return (
    <HashRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={Login} />
      <Route path="/new-game/:handle" component={NewGame} />
    </Switch>
    </HashRouter>
  )
}
}

