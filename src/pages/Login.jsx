import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import '../styling/App.css';
import '../styling/index.css'
import Auth from '../Auth'


export default class Login extends React.Component {

  state = {
    username: "",
    password: "",
    auth: Auth.getAuth(),
    alert: ""
  }

  async checkAuthorization() {
    await Auth.check()
    this.setState({ auth: Auth.getAuth() })
  }

  handleSubmit = async event => {
    event.preventDefault();
    const form = {
      inputUsername: this.state.username,
      inputPassword: this.state.password
    }

    await axios.post(`/login`, form)
      .then(res => {
        let alert = [<div style={{marginLeft:7}} class="alert alert-warning" role="alert">
          {res.data.data}
        </div>]
        this.setState({ alert: alert[0] })
        localStorage.setItem('sudo', res.data.token)
      })
      .catch(error => {
        console.log(error)
      })
    await this.checkAuthorization()
  }

  handleChange = event => {
    if (event.target.name === 'inputUsername') {
      this.setState({ username: event.target.value });
    } else {
      this.setState({ password: event.target.value });
    }
  }

  render() {
    if (this.state.auth) {
      return <Redirect to='/' />
    }
    return (
      <div className="bg form-place">
        <form className="form-signin" onSubmit={this.handleSubmit}>
          <h1 className="h3 mb-3 font-weight-normal" style={{marginLeft:7}}>Sign in to play</h1>
          <label for="inputUsername" className="sr-only">Username</label>
          <input name="inputUsername" onChange={this.handleChange} type="text" id="inputUsername" className="form-control" placeholder="Username" required autofocus="" />
          <label for="inputPassword" className="sr-only">Password</label>
          <input name="inputPassword" onChange={this.handleChange} type="password" id="inputPassword" className="form-control" placeholder="Password" required />
          <div className="checkbox mb-3">
            <p style={{marginLeft:7}}>Dont have an account?<Link to="/signup">Create account</Link></p>
          </div>
          {this.state.alert}
          <button className="btn btn-lg btn-warning btn-block" type="submit" style={{marginLeft:7}}>Sign in</button>
        </form>
      </div>
    )
  }
}


