import React from 'react';
import { Redirect } from 'react-router-dom';
// import logo from './logo.gif';
import '../styling/App.css';
import '../styling/index.css';
import NavBar from '../components/nav-bar'
import logo from '../styling/images/logo.gif';
import Auth from '../Auth'


export default class HomePage extends React.Component {
  state ={
    selectedLvl: "",
    redirect:false,
  }

  handleChange = event => {
    let selectedLvl = event.target.value;
    console.log(`selected1:${selectedLvl}`)
    this.setState({ selectedLvl })
    console.log(`selected2:${selectedLvl}`)
  }

  startGame = () => {
    this.setState({redirect:true})
  }

  render() {
    if(this.state.redirect){
    if(this.state.selectedLvl !== ""){
      this.setState({selectedLvl:""})
     return <Redirect to={`/new-game/${this.state.selectedLvl}`} />
    }
  }
  return (
    <div className="bg">
      <NavBar />
      <div className="container">
        <div className="row justify-content-center">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="row justify-content-center">
          <div className="button">
            <div class="input-group">
              <select class="custom-select" onChange={this.handleChange}>
                <option selected>Choose Level</option>
                <option value="easy">Easy</option>
                <option value="intermediate">Intermediate</option>
                <option value="hard">Hard</option>
                <option value="expert">Expert</option>
              </select>
              <div class="input-group-append">
            <button class="btn btn-warning btm-md">Start Game</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
}

