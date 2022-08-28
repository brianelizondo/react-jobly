import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
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
    return (
        <BrowserRouter>
            <NavBar />
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
                    <LoginForm />
                </Route>
                <Route exact path="/signup">
                    <SignupForm />
                </Route>
                <Route exact path="/profile">
                    <UserProfile />
                </Route>
                <Route>
                    <PageNotFound />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
