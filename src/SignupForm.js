import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button, Card, CardBody } from "reactstrap";

import "./SignupForm.css";

function SignupForm({ userSignup }){
    const history = useHistory();
    // initial state for the form fields to add a new item
    const INITIAL_STATE = { username: "", password: "", firstName: "", lastName: "", email: "" };
    const [formData, setFormData] = useState(INITIAL_STATE);
    // function to handle the change of form fields and form submission
    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };
    const handleSubmit = evt => {
        evt.preventDefault();
        userSignup(formData);
        setFormData(INITIAL_STATE);
        history.push(`/`);
    }

    return (
        <div className="SignupForm col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <h2>Sign Up</h2>
            <Card>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                            <Label for="username">Username</Label>
                            <Input id="username" name="username" type="text" onChange={handleChange} />
                            <Label for="password">Password</Label>
                            <Input id="password" name="password" type="password" onChange={handleChange} />
                            <Label for="firstName">First name</Label>
                            <Input id="firstName" name="firstName" type="text" onChange={handleChange} />
                            <Label for="lastName">Last name</Label>
                            <Input id="lastName" name="lastName" type="text" onChange={handleChange} />
                            <Label for="email">Email</Label>
                            <Input id="email" name="email" type="text" onChange={handleChange} />

                            <Button color="primary" size="sm">Sign Up</Button>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}

export default SignupForm;