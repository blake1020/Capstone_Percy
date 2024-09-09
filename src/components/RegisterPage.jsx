import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3002";

function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [agreement, setAgreement] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!agreement) {
      setError("You must agree to the rules to register. ");
      return;
    }
    try {
      await axios.post(`${API_URL}/users/register`, {
        firstName,
        lastName,
        userName,
        email,
        password,
        role,
      });
      alert("User registered successfully");
      navigate("/users/login");
    } catch (error) {
      console.error("Error registrering user", error);
      setError("Failed to register");
    }
  };

  return (
    <div>
      <h1>Registration Page</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name: </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />{" "}
          <br /> <br />
          <label>Last Name: </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <br />
          <br />
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br /> <br />
          <label>Username: </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <br />
          <label>Password: </label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <label>Confirm Password: </label>
          <input
            type="text"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          <br />
        </div>
        <input
          type="checkbox"
          checked={agreement}
          onChange={(e) => setAgreement(e.target.value)}
        />
        <label>I understand the Rules and conditions</label>

        <p>
          Be respectful <br /> <br />
          No spamming
          <br />
          <br />
          No self adivertizing
        </p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RegisterPage;
