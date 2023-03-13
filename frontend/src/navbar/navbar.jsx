import React from 'react';
import { Menuitems } from "./navbar_menu";
import './navbar.scss'

function Navbar(){
    const handelLogout =()=>{

        setTimeout(() => {
            window.location.href = '/auth/login';
            localStorage.clear();
          }, 2100);
    }
    const imageurl="assests/itTrident-logo.png"
    return (
        <nav className="NavbarItems flex mx-auto">
            <img  title='it TridentSQA' className="navbar-logo" src={imageurl} alt="TridentSQA" />
            <ul className="nav-menu">
                {Menuitems.map((item, index) => {
                    return (
                        <li key={index} className="Home list-none">
                            <a  className={item.cName} href={item.url}>
                                <i className={item.icon}></i>{item.title}</a>
                        </li>
                    )
                })}
            </ul>
            <button onClick={handelLogout}>Logout</button>
        </nav>
    );
}
export default Navbar;
  