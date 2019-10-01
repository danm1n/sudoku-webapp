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
    this.setState({auth: await Auth.check(), loading: false})
  }
  render() {
    if(this.state.loading){
      return(
        <div className= "container"> 
        <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      </div>
      )
    }
    return (
      <div className="App">
          <Router/>
      </div>
    );
  }
}

export default App;
