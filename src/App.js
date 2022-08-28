import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import JoblyApi from "./api";
import UserContext from "./userContext";
import "./App.css"; 

import NavBar from "./NavBar";
import Home from "./Home";
import CompanyList from "./CompanyList";
import CompanyDetails from "./CompanyDetails";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import UserProfile from "./UserProfile";
import PageNotFound from "./PageNotFound";

function App() {
    // initial state for the current user token, login and signup
    const [token, setToken] = useState(false);
    const [currentUser, setCurrentUser] = useState(false);
    useEffect(() => {
        if(token){
            async function getUserInfo() {
                let resp = await JoblyApi.getUser(currentUser);
                setCurrentUser(resp);
            }
            getUserInfo();
        }
    }, [token]);

    // function to sign up, login and logout
    const userSignup = async user => {
        let resp = await JoblyApi.registerUser(user);
        JoblyApi.token = resp.token;
        setToken(resp.token);
        setCurrentUser(user.username);
    }
    const userLogin = async user => {
        let resp = await JoblyApi.loginUser(user);
        JoblyApi.token = resp.token;
        setToken(resp.token);
        setCurrentUser(user.username);
    }
    const userLogout = () => {
        setToken(false);
        setCurrentUser(false);
    }

    return (
        <BrowserRouter>
            <UserContext.Provider value={ currentUser }>
                <NavBar userLogout={userLogout} />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/companies">
                        <CompanyList />
                    </Route>
                    <Route exact path="/companies/:id">
                        <CompanyDetails />
                    </Route>
                    <Route exact path="/jobs">
                        <JobList />
                    </Route>
                    <Route exact path="/login">
                        <LoginForm userLogin={userLogin} />
                    </Route>
                    <Route exact path="/signup">
                        <SignupForm userSignup={userSignup} />
                    </Route>
                    <Route exact path="/profile">
                        <UserProfile />
                    </Route>
                    <Route>
                        <PageNotFound />
                    </Route>
                </Switch>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
