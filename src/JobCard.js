import React, { useContext } from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import UserContext from "./userContext";
import JoblyApi from "./api";
import "./JobCard.css";

function JobCard({ job }){
    // get info about current user
    const { user, setCurrentUser, token } = useContext(UserContext);
    
    // apply to a job process
    const jobApply = async () => {
        const jobApplication = {
            jobId: job.id,
            username: user.username
        }
        JoblyApi.token = token;
        let resp = await JoblyApi.applyJob(jobApplication);
        let respUser = await JoblyApi.getUser(user.username);
        setCurrentUser(respUser);
        jobButton = { applied: jobUnapply, text: "Already Applied", color: "success" };
    }

    // un-apply to a job process
    const jobUnapply = async () => {
        const jobApplication = {
            jobId: job.id,
            username: user.username
        }
        JoblyApi.token = token;
        let resp = await JoblyApi.unapplyJob(jobApplication);
        let respUser = await JoblyApi.getUser(user.username);
        setCurrentUser(respUser);
        jobButton = { applied: jobApply, text: "Apply", color: "primary" };
    }

    // check if the user apply to this job
    let jobButton = { applied: jobApply, text: "Apply", color: "primary" };
    if(user.applications.includes(job.id)){
        jobButton = { applied: jobUnapply, text: "Already Applied", color: "success" };
    }

    return (
        <Card>
            <CardBody>
                <CardTitle>{ job.title }</CardTitle>
                <div className="JobCard-text"><b>{ job.companyName }</b></div>
                <div className="JobCard-text">Salary: { job.salary }</div>
                <div className="JobCard-text">Equity: { job.equity }</div>
                <div className="JobCard-button">
                    <Button color={jobButton.color} size="sm" onClick={jobButton.applied}>{jobButton.text}</Button>
                </div>
            </CardBody>
        </Card>
    );
}

export default JobCard;