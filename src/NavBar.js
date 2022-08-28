import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import "./NavBar.css"

function NavBar() {
  return (
    <div className="NavBar">
        <Navbar>
            <NavbarBrand className="NavBar-brand" href="/">Jobly</NavbarBrand>

            <Nav className="NavBar-links">
                <NavItem>
                    <NavLink exact to="/login" activeClassName="NavBar-links-active">Login</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink exact to="/signup" activeClassName="NavBar-links-active">Sign Up</NavLink>
                </NavItem>
                
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
                    <NavLink exact to="/logout" activeClassName="NavBar-links-active">Logout</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    </div>
  );
}

export default NavBar;