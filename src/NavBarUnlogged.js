import React from "react";
import { NavLink } from "react-router-dom";
import { NavItem } from "reactstrap";

function NavBarUnlogged(){
    return (
        <>
        <NavItem>
            <NavLink exact to="/login" activeClassName="NavBar-links-active">Login</NavLink>
        </NavItem>
        <NavItem>
            <NavLink exact to="/signup" activeClassName="NavBar-links-active">Sign Up</NavLink>
        </NavItem>
        </>
    );
}

export default NavBarUnlogged;