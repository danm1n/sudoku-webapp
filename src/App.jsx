import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewGame from './pages/NewGame';


export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/new-game" component={NewGame} />
    </Switch>
  )
}

