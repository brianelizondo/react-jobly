import React from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import "./JobCard.css";

function JobCard({ job }){
    return (
        <Card>
            <CardBody>
                <CardTitle>{ job.title }</CardTitle>
                <div className="JobCard-text"><b>{ job.companyName }</b></div>
                <div className="JobCard-text">Salary: { job.salary }</div>
                <div className="JobCard-text">Equity: { job.equity }</div>
                <div className="JobCard-button"><Button color="primary" size="sm">Apply</Button></div>
            </CardBody>
        </Card>
    );
}

export default JobCard;