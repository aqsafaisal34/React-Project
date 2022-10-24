import React from 'react';
import './index.css';
import {Link} from 'react-router-dom';

function Navbar() {
  return (
    <div className="nav">
    <div className="heading">
    <h1>U-SHOP</h1>
    </div>

   <div className="list">
    <ul>
        <li><Link to='/'>HOME</Link></li>
        <li><Link to='/signup'>SIGNUP</Link></li>
        <li><Link to='/products'>PRODUCTS</Link></li>
    </ul>
    </div>
      
    </div>
  )
}

export default Navbar;
