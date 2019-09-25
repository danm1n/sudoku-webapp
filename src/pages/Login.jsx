import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/App.css';


export default class Login extends React.Component {
     
    render() {
    return (
        <form className="form-signin" method="POST" action="/login">
  <img className="mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
  <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
  <label for="inputEmail" className="sr-only">Email address</label>
  <input name="inputEmail" type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autofocus=""/>
  <label for="inputPassword" className="sr-only">Password</label>
  <input name="inputPassword" type="password" id="inputPassword" className="form-control" placeholder="Password" required=""/>
  <div className="checkbox mb-3">
    <label>
      <input type="checkbox" value="remember-me"/> Remember me
    </label>
    <p>Dont have an account?<Link to="/signup">Create account</Link></p>
  </div>
 <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
  {/* <p className="mt-5 mb-3 text-muted">© 2017-2019</p> */}
</form>
    )  
}
}


