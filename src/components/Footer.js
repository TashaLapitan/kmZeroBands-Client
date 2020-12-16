import React from 'react';
import {Link} from 'react-router-dom';

function Footer() {
    return (
        <div className="navbar nav-links" style={{marginTop: "50px"}}>
            <Link to="/faq" className='home-btn'><h2>FAQ</h2></Link>
        </div>
    )
}

export default Footer
