import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button, Card, CardBody } from "reactstrap";

import "./LoginForm.css";

function LoginForm({ userLogin }){
    const history = useHistory();
    // initial state for the form fields to add a new item
    const INITIAL_STATE = { username: "", password: "" };
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
        userLogin(formData);
        setFormData(INITIAL_STATE);
        history.push(`/`);
    }
    
    return (
        <div className="LoginForm col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <h2>Login</h2>
            <Card>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                            <Label for="username">Username</Label>
                            <Input id="username" name="username" type="text" onChange={handleChange} />
                            <Label for="password">Password</Label>
                            <Input id="password" name="password" type="password" onChange={handleChange} />

                            <Button color="primary" size="sm">Login</Button>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}

export default LoginForm;