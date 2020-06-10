import React, { Component } from 'react';
import './styling/App.css';
import Router from './Router';
import Auth from './Auth'
import Footer from './components/footer';


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
        <div className="bg">
          <div style={{height: "100vh"}}>
            <div class="centered">
              <span style={{float:'left', fontSize:25, color:'white'}}>Sudoku With A Difference</span>
            <p style={{marginLeft:5, verticalAlign:"middle"}} class="spinner-border text-warning" role="status"></p>
            <p style={{color:"white"}}>If loading persists, <a style={{color:"#ffc107"}} href="/">Click Me</a></p>
            </div>
          </div>
          <Footer />
        </div>
      )
    }
    return (
      <div className="App">
        <Router />
        <Footer />
      </div>
    );
  }
}

export default App;
