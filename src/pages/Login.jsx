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
    auth: Auth.getAuth()
  }

 async checkAuthorization(){
  await Auth.check()
  this.setState({auth : Auth.getAuth()})
  }

  handleSubmit = async event => {
    event.preventDefault();
    const form = {
      inputUsername: this.state.username,
      inputPassword: this.state.password
    }

   await axios.post(`/login`, form)
      .then(res => {
        document.cookie = `sudo=${res.data.token}`
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
    if(this.state.auth){
      return <Redirect to='/'/>
    }
    return (
      <div className="bg form-place">
      <form className="form-signin" onSubmit={this.handleSubmit}>
        <img className="mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputUsername" className="sr-only">Username</label>
        <input name="inputUsername" onChange={this.handleChange} type="text" id="inputUsername" className="form-control" placeholder="Username" required autofocus="" />
        <label for="inputPassword" className="sr-only">Password</label>
        <input name="inputPassword" onChange={this.handleChange} type="password" id="inputPassword" className="form-control" placeholder="Password" required />
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
    </label>
          <p>Dont have an account?<Link to="/signup">Create account</Link></p>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        {/* <p className="mt-5 mb-3 text-muted">© 2017-2019</p> */}
      </form>
      </div>
    )
  }
}


