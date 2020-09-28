import React from 'react'
import {Link} from 'react-router-dom';


export const NavBar = () => {
    return (
       
     <nav className="navbar bg-dark">
      <h1>
        <Link to="/"> حـزب المبرمجين <i className="fa fa-code"></i> </Link>
      </h1>
      <ul>
        <li><Link to="!#">Profiles</Link></li>
        <li><Link to="/register">التسجيل</Link></li>
        <li><Link to="/login">تسجيل الدخول</Link></li>
      </ul>
    </nav> 
     
    )
}

export default NavBar
