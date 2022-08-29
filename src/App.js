import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import JoblyApi from "./api";
import UserContext from "./userContext";
import useLocalStorage from "./hooks";
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
import ProtectedRoute from "./ProtectedRoute";

function App() {
    // initial state for the token, check the local storage
    const [token, setToken] = useLocalStorage("jobly_token");
    // initial state for the current user, login and signup
    const [currentUser, setCurrentUser] = useLocalStorage("jobly_currentUser");
    useEffect(() => {
        if(token){
            async function getUserInfo() {
                JoblyApi.token = token;
                let resp = await JoblyApi.getUser(currentUser.username);
                setCurrentUser(resp);
            }
            getUserInfo();
        }
    }, [token]);

    // function to user update, sign up, login and logout
    const userSignup = async user => {
        let resp = await JoblyApi.registerUser(user);
        JoblyApi.token = resp.token;
        setToken(resp.token);
        setCurrentUser({ username: user.username });
    }
    const userLogin = async user => {
        let resp = await JoblyApi.loginUser(user);
        JoblyApi.token = resp.token;
        setToken(resp.token);
        setCurrentUser({ username: user.username });
    }
    const userLogout = () => {
        setToken(false);
        setCurrentUser(false);
    }
    const userUpdateInfo = async user => {
        JoblyApi.token = token;
        let resp = await JoblyApi.updateUser(user);
        let respUser = await JoblyApi.getUser(resp.username);
        setCurrentUser(respUser);
    }

    return (
        <BrowserRouter>
            <UserContext.Provider value={{ user: currentUser, userUpdateInfo, setCurrentUser, token }}>
                <NavBar userLogout={userLogout} />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>

                    {/* PROTECTED ROUTES */}
                    <ProtectedRoute exact path="/companies" component={CompanyList} />
                    <ProtectedRoute exact path="/companies/:id" component={CompanyDetails} />
                    <ProtectedRoute exact path="/jobs" component={JobList} />
                    <ProtectedRoute exact path="/profile" component={UserProfile} />
                    
                    <Route exact path="/login">
                        <LoginForm userLogin={userLogin} />
                    </Route>
                    <Route exact path="/signup">
                        <SignupForm userSignup={userSignup} />
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
