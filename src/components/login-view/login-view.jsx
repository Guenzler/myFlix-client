import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "./styles.scss";
import PropTypes from "prop-types";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();

        const data = {
            username: username,
            password: password
        };

        fetch("https://movie-app-2024-716106e34297.herokuapp.com/login", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((data) => {
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    onLoggedIn(data.user, data.token);
                } else {
                    if (data.message.message) {
                        document.getElementById('ermessg').innerText = data.message.message;

                    } else {
                        document.getElementById('ermessg').innerText = 'something went wrong';
                    }
                }
            })
            .catch((e) => {
                alert("Some error occured");
            });
    };

    return (

        <Form onSubmit={handleSubmit} className="bg-secondary py-3 px-4">
            <h3>Login:</h3>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="5"
                />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="5"
                    maxLength="15"
                />
            </Form.Group>
            <p id="ermessg"></p>
            <Button variant="info" type="submit">
                Submit
            </Button>

            <p className="linkToRegister"><Link to="/signup" >or register</Link></p>
        </Form>
    );
};

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
}