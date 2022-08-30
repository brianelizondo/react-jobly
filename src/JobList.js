import React, { useState, useEffect } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import "./JobList.css";

import JoblyApi from "./api";
import Loading from "./Loading";
import PaginationCustom from "./PaginationCustom";
import JobCard from "./JobCard";

function JobList(){
    // initial state for the form fields to add a new item
    const INITIAL_STATE = { search: "" };
    const [formData, setFormData] = useState(INITIAL_STATE);

    // state value for jobs list
    const [jobs, setJobs] = useState([]);

    // pagination config
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 30;
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = jobs.slice(indexOfFirstResult, indexOfLastResult);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        async function getJobs() {
            setLoading(true);
            let resp = await JoblyApi.getJobs();
            // set the jobs list
            setJobs(resp.jobs);
            setLoading(false);
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
            setLoading(true);
            let resp = await JoblyApi.findJobs(formData.search);
            // set the jobs list
            setJobs(resp.jobs);
            setLoading(false);
        }
        getFilteredJobs();
    }

    if(loading){
        return <Loading />;
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
                { currentResults.map(job => (<JobCard job={job} key={job.id} />)) }
            </div>
            <div className="JobList-pagination">
                <PaginationCustom resultsPerPage={resultsPerPage} totalResults={jobs.length} paginate={paginate} />
            </div>
        </div>
    );
}

export default JobList;