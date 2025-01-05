import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loader from "../loader/loader";
import "./styles.scss";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [isLoadingData, setIsLoadingData] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoadingData(true);

        const data = {
            username: username,
            password: password,
            email: email,
            birthdate: birthdate
        };
        fetch("https://movie-app-2024-716106e34297.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.ok) {
                alert("Signup successful, please login now");
                navigate("/");
                setIsLoadingData(false); // Stop loading
            } else {
                // Check response for error messages
                // Check if response is of type application/json
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    // Parse JSON response
                    return response.json();
                } else if (contentType && contentType.includes('text/html')) {
                    return response.text();
                } else {
                    throw new Error('Some error occured');
                }
            }
        })
            .then(data => {
                // output error messages contained in response on page
                if (typeof data === 'object') {
                    // If data is JSON
                    if (data.errors) {
                        let count = 0;
                        let errorMessage = "";
                        while (count < data.errors.length) {
                            errorMessage = errorMessage + data.errors[count].msg + '  ';
                            count = count + 1;
                        }
                        document.getElementById('output').innerText = errorMessage;
                    } else {
                        document.getElementById('output').innerText = JSON.stringify(data);
                    }
                } else if (typeof data === 'string') {
                    // If data is a string
                    document.getElementById('output').innerText = data;
                } else {
                    document.getElementById('output').innerText = "something went wrong";
                }
                setIsLoadingData(false); // Stop loading after processing response
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById("output").innerText = "An error occurred";
                setIsLoadingData(false); // Stop loading on error
            })
            .finally(() => {
                setIsLoadingData(false); // Always stop loading, no matter what happens
            });
    };

    return (
        <Form onSubmit={handleSubmit} className="bg-secondary py-3 px-4">
            <h3>Registration:</h3>
            <p>Please fill out all fields marked with *</p>
            {/* Loader: Show this when loading */}
            {isLoadingData && ( <Loader /> )} 
            <Form.Group controlId="formSignupUsername">
                <Form.Label>Username*:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="5"
                />
            </Form.Group>
            <Form.Group controlId="formSignupPassword">
                <Form.Label>Password*:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength="5"
                    maxLength="15"
                    required
                />
            </Form.Group>
            <Form.Group controlId="formSignupEmail">
                <Form.Label>Email*:</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formSignupBirthdate">
                <Form.Label>Date of Birth:</Form.Label>
                <Form.Control
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                />
            </Form.Group>
            <p id="output"></p>
            <Button variant="info" type="submit">
                Submit
            </Button>
        </Form>
    );
};