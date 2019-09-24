import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/App.css';


export default class Signup extends React.Component {
     
    render() {
    return (
        <form className="form-signin" method="POST" action="/login">
  <img className="mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
  <h1 className="h3 mb-3 font-weight-normal">Signup</h1>
  <label for="inputName" className="sr-only">Name</label>
  <input name="inputName" type="text" id="inputName" className="form-control" placeholder="Enter Name" required="" autofocus=""/>
  <label for="inputEmail" className="sr-only">Email address</label>
  <input name="inputEmail" type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autofocus=""/>
  <label for="inputPassword" className="sr-only">Password</label>
  <input name="inputPassword" type="password" id="inputPassword" className="form-control" placeholder="Password" required=""/>

   <label for="confirmPassword" className="sr-only">Confirm Password</label>
  <input name="confirmPassword" type="password" id="inputPassword" className="form-control" placeholder="Confirm Password" required=""/>

 <button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
  {/* <p className="mt-5 mb-3 text-muted">© 2017-2019</p> */}
</form>
    )  
}
}


