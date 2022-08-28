import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CompanyDetails.css"

import JoblyApi from "./api";

function CompanyDetails() {
    // get the handle id from the browser url
    const { id } = useParams();
    const [company, setCompany] = useState({});
    const [companyJobs, setCompanyJobs] = useState([]);

    useEffect(() => {
        async function getCompany() {
            let resp = await JoblyApi.getCompany(id);
            // set the company details
            setCompany(resp);
            setCompanyJobs(resp.jobs);
        }
        getCompany();
    }, []);

    return (
        <div className="CompanyDetails col-md-8 offset-md-2">
            <div className="CompanyDetails-name">{ company.name }</div>
            <div className="CompanyDetails-description">{ company.description }</div>
            <div className="CompanyList-jobs">
                
            </div>
        </div>
    );
}

export default CompanyDetails;