import React, { Component } from 'react';
import './styling/App.css';
import Router from './Router';
import Auth from './Auth'


class App extends Component {
  state = {
    auth: false,
    loading: true
  }
  async componentDidMount() {
    this.setState({ auth: await Auth.check(), loading: false })
  }
  render() {
    if (this.state.loading) {
      return (
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h2 class="display-4">Sudoku Webapp<p class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </p></h2>
            <p>If loading persists, <a href="/">Click Me</a></p>
          </div>
        </div>
      )
    }
    return (
      <div className="App">
        <Router />
      </div>
    );
  }
}

export default App;
