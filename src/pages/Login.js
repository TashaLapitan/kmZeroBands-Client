import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from './../context/auth-context';

class Login extends Component {
  state = { 
    email: "", 
    password: "" 
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.login(email, password);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div style={{height: "52vh"}}>
        <h1>Login</h1>

        <form onSubmit={this.handleFormSubmit} className="auth-form">
          
          <label>Email:</label> <br/>
          <input type="text" name="email" value={email} onChange={this.handleChange} required/> <br/>

          <label>Password:</label> <br/>
          <input type="password" name="password" value={password} onChange={this.handleChange} required/> <br/>

          <button className="yes-btn" type="submit">Login</button>
        </form>
        <p>Don't have an account yet?</p>
        <Link to={"/signup"}>Let's get you signed up!</Link>
      </div>
    );
  }
}

export default withAuth(Login);
