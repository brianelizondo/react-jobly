import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Navbar, NavbarBrand, Nav } from "reactstrap";
import UserContext from "./userContext";
import "./NavBar.css"

import NavBarLogged from "./NavBarLogged";
import NavBarUnlogged from "./NavBarUnlogged";

function NavBar({ userLogout }) {
    const history = useHistory();
    // get info about current user
    const user = useContext(UserContext);
    
    // function to handle the logout action
    const handleLogout = evt => {
        evt.preventDefault();
        userLogout();
        history.push(`/`);
    }

    return (
        <div className="NavBar">
            <Navbar>
                <NavbarBrand className="NavBar-brand" href="/">Jobly</NavbarBrand>

                <Nav className="NavBar-links">
                    { user 
                        ? <NavBarLogged logout={handleLogout} />
                        : <NavBarUnlogged />
                    }
                </Nav>
            </Navbar>
        </div>
    );
}

export default NavBar;