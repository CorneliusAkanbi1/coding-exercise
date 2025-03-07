import React, { useState } from "react";
import "./LoginSignup.css";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import TranslationApp from "../TranslationApp/TranslationApp";

// Firebase imports
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"; // Import Firestore methods

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV6ltBz9siU993dlXud-pxGYc3028NP8E",
  authDomain: "coding-exercise-ddcf6.firebaseapp.com",
  projectId: "coding-exercise-ddcf6",
  storageBucket: "coding-exercise-ddcf6.appspot.com",
  messagingSenderId: "770915735779",
  appId: "1:770915735779:web:c27d8c9582f49e863b8dd6",
  measurementId: "G-X0SC710QQR",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Handle form submission for Login
  const handleLogin = async () => {
    try {
      const userDocRef = doc(firestore, "users", email); // Reference to the user's document
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const user = userDocSnap.data();

        if (user.password === password) {
          setUserData(user);
          setLoggedIn(true);
          setErrorMessage("");
          alert("Login successful!");
        } else {
          setErrorMessage("Invalid password.");
        }
      } else {
        setErrorMessage("No user found with this email.");
      }
    } catch (error) {
      console.error("Error logging in: ", error);
      setErrorMessage("An error occurred during login.");
    }
  };

  // Handle form submission for Sign Up
  const handleSignUp = async () => {
    try {
      const userDocRef = doc(firestore, "users", email); // Reference to the user's document
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        setErrorMessage("This email is already registered.");
        return;
      }

      // Create a new user document in Firestore
      await setDoc(userDocRef, { name, email, password });
      setErrorMessage("");
      alert("Sign-up successful!");

      // Switch to Login page after successful sign-up
      setAction("Login");
    } catch (error) {
      console.error("Error signing up: ", error);
      setErrorMessage("An error occurred during sign-up.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    setLoggedIn(false);
    setUserData(null);
  };

  return (
    <div className="container">
      {/* If user is logged in, show TranslationApp component */}
      {loggedIn ? (
        <TranslationApp />
      ) : (
        // If not logged in, show login/signup form
        <div>
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
              <div className="submit" onClick={handleSignUp}>
                Sign Up
              </div>
            )}

            {/* Show only the "Login" button on the Login page */}
            {action === "Login" && (
              <div className="submit" onClick={handleLogin}>
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
      )}
    </div>
  );
};

export default LoginSignup;
