import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from './../context/auth-context';
import userService from './../lib/user-service';

class Navbar extends Component {

  state = {
    user: {
      image: ""
    }
  }

  setUserState = () => {
    if (this.props.isLoggedIn) {
      userService.getUser(this.props.user._id)
      .then((currentUser) => {
        this.setState({user: currentUser.data});
      })
    }
  }

  componentDidMount () {
    this.setUserState();
  }

  render() {

    return (
      <nav className="navbar">
        <Link to={'/'} id='home-btn'>
          <h4>Logoimage</h4>
        </Link>
        <Link to="/gigboard">Gig Board</Link>
        <Link to="/faq">FAQ</Link>
        {this.props.isLoggedIn 
        ? (
          <>
          <div>
              {this.state.user.image 
              ? <Link to={'/my-profile'}><img src={this.state.user.image} alt=""/></Link>
              : <Link to={'/my-profile'}><img src="/images/profile-image-placeholder.png" width="40px" alt=""/></Link>}
          </div>
            
            <Link onClick={() => this.props.logout()} to="/">
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
