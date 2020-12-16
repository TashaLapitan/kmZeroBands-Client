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
      <nav className="navbar" style={{marginBottom: "50px"}}>
        <div className="nav-links">
            <Link to="/gigboard" className='home-btn'><h3>Gig Board</h3></Link>
          </div>
        <Link to={'/'} className='home-btn'>
          <img src="/images/ZEROkmBANDS_Logo.png" alt="" width="400px"/>
        </Link>
        {this.props.isLoggedIn 
        ? <div style={{display: "flex"}}>
              {this.state.user.image 
              ? <Link to={'/my-profile'}><div className="profile-img"><img src={this.state.user.image} alt=""/></div></Link>
              : <Link to={'/my-profile'}><div className="profile-img"><img src="/images/profile-image-placeholder.png" width="40px" alt=""/></div></Link>}
          
            
            <Link onClick={() => this.props.logout()} to="/">
              <img src="/images/logout-btn.png" width="20px" height="20px" alt=""/>
            </Link>
          </div>
       : <div>
            <Link to="/login">
              <button className="yes-btn" className="navbar-button">Login</button>
            </Link>
            <Link to="/signup">
              <button className="yes-btn" className="navbar-button">Signup</button>
            </Link>
          </div>
        }
      </nav>
    );
  }
}

export default withAuth(Navbar);
