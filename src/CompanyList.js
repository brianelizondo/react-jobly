import React, { useState, useEffect } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import "./CompanyList.css";

import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";

function CompanyList(){
    // initial state for the form fields to add a new item
    const INITIAL_STATE = { search: "" };
    const [formData, setFormData] = useState(INITIAL_STATE);

    // state value for companies list
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        async function getCompanies() {
            let resp = await JoblyApi.getCompanies();
            // set the companies list
            setCompanies(resp.companies);
        }
        getCompanies();
    }, []);

    // function to handle the change of form fields and form submission
    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };
    const searchCompanies = evt => {
        evt.preventDefault();
        async function getFilteredCompanies() {
            let resp = await JoblyApi.findCompanies(formData.search);
            // set the companies list
            setCompanies(resp.companies);
        }
        getFilteredCompanies();
    }

    return (
        <div className="CompanyList col-md-8 offset-md-2">
            <div className="CompanyList-search">
                <Form inline onSubmit={searchCompanies}>
                    <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                        <Input id="search" name="search" type="text" placeholder="Search a company..." onChange={handleChange} />
                        <Button color="primary" size="md">Submit</Button>
                    </FormGroup>
                </Form>
            </div>
            <div className="CompanyList-list">
                { companies.map(company => (<CompanyCard company={company} key={company.handle} />)) }
            </div>
        </div>
    );
}

export default CompanyList;