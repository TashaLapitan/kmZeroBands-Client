import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from './../context/auth-context';

class Navbar extends Component {
  render() {
    // const { user, logout, isLoggedin } = this.props;
    return (
      <nav className="navbar">
        <Link to={'/'} id='home-btn'>
          <h4>Logoimage</h4>
        </Link>
        {this.props.isLoggedIn ? (
          <>
          <div>
              {this.props.user.image 
              ? <img src={this.props.user.image} alt=""/>
              : <img src="/images/profile-image-placeholder.png" alt=""/>}
          </div>
            
            <Link onClick={this.props.logout} to="/">
              <img src="/images/logout-btn.png" width="20px" height="20px" alt=""/>
            </Link>
          </>
        ) : (
          <>
          <div>
            <Link to="/login">
              <button className="navbar-button">Login</button>
            </Link>
            <Link to="/signup">
              <button className="navbar-button">Signup</button>
            </Link>
          </div>
          </>
        )}
      </nav>
    );
  }
}

export default withAuth(Navbar);
