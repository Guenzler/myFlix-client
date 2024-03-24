import { useState } from "react";


export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

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
                alert("Signup successful");
                window.location.reload();
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
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (

        <form onSubmit={handleSubmit}>
            <label>
                Username*:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="5"
                />
            </label>
            <br />
            <label>
                Password*:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength="5"
                    maxLength="15"
                    required
                />
            </label>
            <br />
            <label>
                Email*:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Birthday:
                <input
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                />
            </label>
            <br />
            <p id="output"></p>
            <button type="submit">Submit</button>
        </form>
    );
};