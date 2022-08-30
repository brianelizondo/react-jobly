import React from "react";
import "./Loading.css";
import imgLoading from "./loading.gif";

function Loading(){
    return (
        <div className="Loading">
            <div><img src={imgLoading} alt="" /></div>
            <div>Loading...</div>
        </div>
    );
}

export default Loading;