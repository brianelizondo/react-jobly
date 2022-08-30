import React, { useState, useEffect, useCallback } from "react";
import _debounce from 'lodash/debounce';
import { Form, FormGroup, Input, Button } from "reactstrap";
import "./CompanyList.css";

import JoblyApi from "./api";
import Loading from "./Loading";
import PaginationCustom from "./PaginationCustom";
import CompanyCard from "./CompanyCard";

function CompanyList(){
    // initial state for the form fields to add a new item
    const INITIAL_STATE = { search: "" };
    const [formData, setFormData] = useState(INITIAL_STATE);

    // state value for companies list
    const [companies, setCompanies] = useState([]);

    // pagination config
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 20;
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = companies.slice(indexOfFirstResult, indexOfLastResult);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        async function getCompanies() {
            setLoading(true);
            let resp = await JoblyApi.getCompanies();
            // set the companies list
            setCompanies(resp.companies);
            setLoading(false);
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
        debounceFn(value);
    };
    const searchCompanies = (searchTerms) => {
        // evt.preventDefault();
        async function getFilteredCompanies() {
            setLoading(true);
            let resp = await JoblyApi.findCompanies(searchTerms);
            // set the companies list
            setCompanies(resp.companies);
            setLoading(false);
        }
        getFilteredCompanies();
    }
    // live search with lodash debounce function
    const debounceFn = useCallback(_debounce(searchCompanies, 1000), []);


    if(loading){
        return <Loading />;
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
                { currentResults.map(company => (<CompanyCard company={company} key={company.handle} />)) }
            </div>
            <div className="CompanyList-pagination">
                <PaginationCustom resultsPerPage={resultsPerPage} totalResults={companies.length} paginate={paginate} />
            </div>
        </div>
    );
}

export default CompanyList;