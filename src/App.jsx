import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewGame from './pages/NewGame';


export default class App extends React.Component {

  render () {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/new-game" component={NewGame} />
    </Switch>
  )
}
}

