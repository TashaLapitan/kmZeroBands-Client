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
            <img src={this.props.user.image ? this.props.user.image : "/images/profile-image-placeholder.png"} alt=""/>
            <Link to="/logout">
              <img src="/images/logout-btn.png" alt=""/>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="navbar-button">Login</button>{' '}
            </Link>
          </>
        )}
      </nav>
    );
  }
}

export default withAuth(Navbar);
