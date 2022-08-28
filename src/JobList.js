import React, { useState, useEffect } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import "./JobList.css";

import JoblyApi from "./api";
import JobCard from "./JobCard";

function JobList(){
    // initial state for the form fields to add a new item
    const INITIAL_STATE = { search: "" };
    const [formData, setFormData] = useState(INITIAL_STATE);

    // state value for jobs list
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        async function getJobs() {
            let resp = await JoblyApi.getJobs();
            // set the jobs list
            setJobs(resp.jobs);
        }
        getJobs();
    }, []);

    // function to handle the change of form fields and form submission
    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };
    const searchJobs = evt => {
        evt.preventDefault();
        async function getFilteredJobs() {
            let resp = await JoblyApi.findJobs(formData.search);
            // set the jobs list
            setJobs(resp.jobs);
        }
        getFilteredJobs();
    }

    return (
        <div className="JobList col-md-8 offset-md-2">
            <div className="JobList-search">
                <Form inline onSubmit={searchJobs}>
                    <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                        <Input id="search" name="search" type="text" placeholder="Search a job..." onChange={handleChange} />
                        <Button color="primary" size="md">Submit</Button>
                    </FormGroup>
                </Form>
            </div>
            <div className="JobList-list">
                { jobs.map(job => (<JobCard job={job} key={job.id} />)) }
            </div>
        </div>
    );
}

export default JobList;