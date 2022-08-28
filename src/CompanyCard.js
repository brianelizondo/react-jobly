import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import "./CompanyCard.css";

function CompanyCard({ company }){
    return (
        <Link to={`/companies/${company.handle}`} key={company.handle}>
            <Card>
                <CardBody>
                    <CardTitle>{ company.name }</CardTitle>
                    <CardText>{ company.description }</CardText>
                </CardBody>
            </Card>
        </Link>
    );
}

export default CompanyCard;