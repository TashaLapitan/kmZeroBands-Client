import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from './../context/auth-context';

class Signup extends Component {
  state = { username: "", email: "", password: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, email, password } = this.state;
    
    this.props.signup( username, email, password );
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, email, password } = this.state;
    return (
      <div>
        <h1>Sign Up</h1>

        <form onSubmit={this.handleFormSubmit} className="auth-form">

          <label>Username:</label> <br/>
          <input type="text" name="username" value={username} onChange={this.handleChange} required/> <br/>

          <label>Email:</label> <br/>
          <input type="email" name="email" value={email} onChange={this.handleChange} required/> <br/>

          <label>Password:</label> <br/>
          <input type="password" name="password" value={password} onChange={this.handleChange} required/> <br/>

          <button className="yes-btn" type="submit">Signup</button>
        </form>
        
        <p>Already have account?</p>
        <Link to={"/login"}> Login</Link>
      </div>
    );
  }
}



export default withAuth(Signup);

