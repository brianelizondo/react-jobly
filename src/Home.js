import React, { useContext } from "react";
import { Button } from "reactstrap";
import UserContext from "./userContext";
import "./Home.css"

function Home(){
    // get info about current user
    const { user } = useContext(UserContext);

    return (
        <div className="Home">
            <h1>Jobly</h1>
            <p>All the jobs in one, convenient place.</p>
            
            { user 
            ?   <h3>Welcome Back, { user.firstName }!</h3>
            :   <p className="Home-buttons">
                    <Button color="primary" href="login" tag="a">Login</Button>
                    <Button color="primary" href="signup" tag="a">Sign up</Button>
                </p>
            }
        </div>
    );
}

export default Home;