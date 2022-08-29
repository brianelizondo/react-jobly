import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button, Card, CardBody, CardText } from "reactstrap";
import UserContext from "./userContext";
import "./UserProfile.css";

function UserProfile() {
    const history = useHistory();
    // get info about current user
    const { user, userUpdateInfo } = useContext(UserContext);
    // initial state for the form fields to add a new item
    const INITIAL_STATE = { username: user.username, password: "", firstName: user.firstName, lastName: user.lastName, email: user.email };
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
        userUpdateInfo(formData);
        history.push("/");
    }

    return (
        <div className="UserProfile col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <h2>Profile</h2>
            <Card>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                            <Label for="username">Username</Label>
                            <CardText>{ user.username }</CardText>
                            <Label for="firstName">First name</Label>
                            <Input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} />
                            <Label for="lastName">Last name</Label>
                            <Input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} />
                            <Label for="email">Email</Label>
                            <Input id="email" name="email" type="text" value={formData.email} onChange={handleChange} />
                            <Label for="password">Confirm password to make changes:</Label>
                            <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} />

                            <Button color="primary" size="sm">Save Changes</Button>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}

export default UserProfile;