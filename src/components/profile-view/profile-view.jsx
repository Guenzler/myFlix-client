import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { FavoriteMovies } from "./favorite-movies";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import PropTypes from "prop-types";

export const ProfileView = ({ user, token, movies, updateUser, updateToken }) => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Format the date to YYYY-MM-DD which is the required format for input type="date"
        return date.toISOString().split('T')[0];
    };

    // define useState for input fields: these values reflect, what is shown in input fields and can be changed by user
    const [formfieldusername, setFormfieldusername] = useState(user.username);
    const [formfieldemail, setFormfieldemail] = useState(user.email);
    const [formfieldbirthdate, setFormfieldbirthdate] = useState(user.birthdate ? formatDate(user.birthdate) : "");
    const [formfieldpassword, setFormfieldpassword] = useState("");

    //define array of movies that contains the favorite movies of user
    let favoriteMovies = movies.filter(m => user.favoriteMovies.includes(m.id));

    const handleSubmit = (event) => {

        event.preventDefault(event);

        const data = {
            username: formfieldusername,
            password: formfieldpassword,
            email: formfieldemail,
            birthdate: formfieldbirthdate
        };

        fetch(`https://movie-app-2024-716106e34297.herokuapp.com/users/${user.username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    alert("Update successful");
                    return response.json()
                } else {
                    const contentType = response.headers.get("content-type");
                    if (contentType && contentType.includes("application/json")) {
                        return response.json().then((errorData) => {
                            if (errorData.errors) {
                                let count = 0;
                                let errorMessage = "";
                                while (count < errorData.errors.length) {
                                    errorMessage = errorMessage + errorData.errors[count].msg + '  ';
                                    count = count + 1;
                                }
                                throw new Error(errorMessage);
                            } else {
                                throw new Error(JSON.stringify(errorData));
                            }
                        });
                    } else {
                        return response.text().then((errorText) => {
                            throw new Error(errorText);
                        });
                    }
                }
            })
            .then((updateduser) => {
                if (updateduser.username) {
                    localStorage.setItem("user", JSON.stringify(updateduser));
                    updateUser(updateduser);
                    setFormfieldpassword("");
                }
            }
            )
            .catch((error) => {
                console.error(error);
                alert("Update failed: " + error.message);
            });
    }

    const handleDelete = (event) => {
        event.preventDefault(event);
        fetch(`https://movie-app-2024-716106e34297.herokuapp.com/users/${user.username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            if (response.ok) {
                alert("Account deleted successfully.");
                localStorage.clear();
                updateUser(null);
                updateToken(null);
                window.location.reload();
            } else {
                alert("Something went wrong.");
            }
        });
    }

    return (
        <>
            <Row className="bg-secondary">
                <Col md={4} className="py-3 px-4">
                    <h2>Hello {user.username}</h2>
                    <p>Your user information:</p>
                    <p>Username: {user.username} <br />
                        Email: {user.email}<br />
                        {user.birthdate ? "Birthdate:  " + formatDate(user.birthdate) : ""}
                    </p>
                    <p>You can use this form to update your user information. Please fill out all fields marked with an *.</p><p>Please input your current password, or, if you wish to change it, input a new password.</p>

                </Col>
                <Col>
                    <Form onSubmit={handleSubmit} className="py-3 px-4">
                        <h2>Update User information </h2>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                type="text"
                                minLength={5}
                                value={formfieldusername}
                                onChange={(e) => setFormfieldusername(e.target.value)}
                                disabled
                            />
                            <br />
                        </Form.Group>
                        <Form.Group controlId="formBirthday">
                            <Form.Label> Birthday: </Form.Label>
                            <Form.Control
                                type="date"
                                value={formfieldbirthdate}
                                onChange={(e) => setFormfieldbirthdate(e.target.value)}
                            />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="formEmail">
                            <Form.Label> Email*: </Form.Label>
                            <Form.Control
                                type="email"
                                value={formfieldemail}
                                onChange={(e) => setFormfieldemail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password*:
                            </Form.Label>
                            <Form.Control
                                type="password"
                                minLength="5"
                                maxLength="15"
                                value={formfieldpassword}
                                onChange={(e) => setFormfieldpassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <br />
                        <Button variant="info" type="submit" className="primaryButton deleteButton w-100">
                            Update my user information
                        </Button>

                        <p></p>
                        <p>For deregistering, click the button below<br />
                            <span className="text-danger py-2">Warning - you can't undo this, all your data will be deleted</span></p>
                        <p><Button className="primaryButton deleteButton" variant="danger" type="button" onClick={handleDelete}>Delete Account</Button></p>
                    </Form>
                </Col>
            </Row>
            <Row className="bg-secondary">
                <FavoriteMovies favoriteMovies={favoriteMovies} updateUser={updateUser} />
            </Row>

        </>
    )

}

ProfileView.propTypes = {
    user: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    movies: PropTypes.array.isRequired,
    updateUser: PropTypes.func.isRequired,
    updateToken: PropTypes.func.isRequired
}