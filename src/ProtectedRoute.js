import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
    const userToken = JSON.parse(window.localStorage.getItem("jobly_token"));
    const userCurrentUser = JSON.parse(window.localStorage.getItem("jobly_currentUser"));
    
    const isAuthenticated = userToken && userCurrentUser ? true : false;

    return (
        <Route
            {...restOfProps} 
            render={(props) => isAuthenticated ? <Component {...props} /> : <Redirect to="/login" /> }
        />
    );
}

export default ProtectedRoute;