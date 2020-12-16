import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from './../context/auth-context';
import userService from './../lib/user-service';

function Navbar (props) {
    return (
      <nav className="navbar" style={{marginBottom: "50px"}}>
        <div className="nav-links">
            <Link to="/gigboard" className='home-btn'><h3>Gig Board</h3></Link>
          </div>
        <Link to={'/'} className='home-btn'>
          <img src="/images/ZEROkmBANDS_Logo.png" alt="" width="400px"/>
        </Link>
        {props.isLoggedIn 
        ? <div style={{display: "flex"}}>
              {props.user.image
              ? <Link to={'/my-profile'}><div className="profile-img"><img src={props.user.image} alt=""/></div></Link>
              : <Link to={'/my-profile'}><div className="profile-img"><img src="/images/profile-image-placeholder.png" width="40px" alt=""/></div></Link>}
          
            
            <div onClick={() => props.logout()}>
              <img src="/images/logout-btn.png" width="20px" height="20px" alt=""/>
            </div>
          </div>
       : <div>
            <Link to="/login">
              <button className="yes-btn">Login</button>
            </Link>
          </div>
        }
      </nav>
    );
  }

export default withAuth(Navbar);
