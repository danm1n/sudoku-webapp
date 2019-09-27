import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styling/App.css';


export default class Login extends React.Component {

  state = {
    username: "",
    password: ""
  }

  handleSubmit = event => {
    event.preventDefault();
    // const formData = new FormData();
    const form = {
      inputEmail: this.state.username,
      inputPassword: this.state.password
    }
    // formData.append('inputEmail', username);
    // formData.append('inputPassword', password);
    axios.post(`/login`, form)
      .then(res => {
        document.cookie = `sudo=${res.data.token}`
        console.log(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleChange = event => {
    if (event.target.name === 'inputEmail') {
      this.setState({ username: event.target.value });
    } else {
      this.setState({ password: event.target.value });
    }
  }

  render() {
    return (
      <form className="form-signin" onSubmit={this.handleSubmit}>
        <img className="mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputEmail" className="sr-only">Email address</label>
        <input name="inputEmail" onChange={this.handleChange} type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autofocus="" />
        <label for="inputPassword" className="sr-only">Password</label>
        <input name="inputPassword" onChange={this.handleChange} type="password" id="inputPassword" className="form-control" placeholder="Password" required="" />
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
    </label>
          <p>Dont have an account?<Link to="/signup">Create account</Link></p>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        {/* <p className="mt-5 mb-3 text-muted">© 2017-2019</p> */}
      </form>
    )
  }
}


