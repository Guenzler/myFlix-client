import React from "react";
import { useState } from "react";


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
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    minLength="5"
                    required />
            </label>
            <br />
            <br />
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength="5" 
                    maxLength="15"
                    required />
            </label>
            <p id="ermessg"></p>
            <button type="submit">Submit</button>
        </form>
    );
};