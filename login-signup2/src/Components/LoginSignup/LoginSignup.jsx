import React, { useState } from 'react';
import './LoginSignup.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const LoginSignup = () => {
    const [action, setAction] = useState("Sign Up"); // Default action is "Sign Up"
    const [email, setEmail] = useState(""); // Store email input
    const [password, setPassword] = useState(""); // Store password input
    const [name, setName] = useState(""); // Store name input (only used for Sign Up)
    const [errorMessage, setErrorMessage] = useState(""); // To show error messages
    const [users, setUsers] = useState([]); // State to simulate storing users (like a database)

    // Handle form submission for Login
    const handleLogin = () => {
        const user = users.find(
            (user) => user.email === email && user.password === password
        );

        if (user) {
            // Simulate user login by storing the user in localStorage
            localStorage.setItem("user", JSON.stringify(user));
            setErrorMessage(""); // Clear any error messages
            alert("Login successful!");
        } else {
            setErrorMessage("Invalid email or password.");
        }
    };

    // Handle form submission for Sign Up
    const handleSignUp = () => {
        const existingUser = users.find((user) => user.email === email);
        if (existingUser) {
            setErrorMessage("This email is already registered.");
            return;
        }

        // Create a new user object and add it to the users list
        const newUser = { name, email, password };
        setUsers([...users, newUser]); // Simulating storing user data
        setErrorMessage(""); // Clear any error messages
        alert("Sign-up successful!");
        // Switch to Login page after successful sign-up
        setAction("Login");
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>

            <div className="inputs">
                {/* Render name input only on Sign Up */}
                {action === "Sign Up" && (
                    <div className="input">
                        <img src={user_icon} alt="User Icon" />
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                )}

                <div className="input">
                    <img src={email_icon} alt="Email Icon" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="input">
                    <img src={password_icon} alt="Password Icon" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            {/* Error message */}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            {/* Forgot password link for Login */}
            {action === "Login" && (
                <div className="forgot-password">
                    Forgot Password? <span>Click Here!</span>
                </div>
            )}

            <div className="submit-container">
                {/* Show only the "Sign Up" button on the Sign Up page */}
                {action === "Sign Up" && (
                    <div
                        className="submit"
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </div>
                )}

                {/* Show only the "Login" button on the Login page */}
                {action === "Login" && (
                    <div
                        className="submit"
                        onClick={handleLogin}
                    >
                        Login
                    </div>
                )}
            </div>

            {/* Toggle between Sign Up and Login */}
            <div className="toggle-container">
                {action === "Login" ? (
                    <div
                        className="submit gray"
                        onClick={() => setAction("Sign Up")}
                    >
                        Don't have an account? Sign Up
                    </div>
                ) : (
                    <div
                        className="submit gray"
                        onClick={() => setAction("Login")}
                    >
                        Already have an account? Login
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginSignup;
