import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { NavItem } from "reactstrap";

import UserContext from "./userContext";

function NavBarLogged({ logout }){
    // get info about current user
    const user = useContext(UserContext);

    return (
        <>
        <NavItem>
            <NavLink exact to="/companies" activeClassName="NavBar-links-active">Companies</NavLink>
        </NavItem>
        <NavItem>
            <NavLink exact to="/jobs" activeClassName="NavBar-links-active">Jobs</NavLink>
        </NavItem>
        <NavItem>
            <NavLink exact to="/profile" activeClassName="NavBar-links-active">Profile</NavLink>
        </NavItem>
        <NavItem>
            <NavLink exact to="/logout" activeClassName="NavBar-links-active" onClick={logout}>Log out {user.username}</NavLink>
        </NavItem>
        </>
    );
}

export default NavBarLogged;