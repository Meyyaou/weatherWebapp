import React, { useState } from "react";
import "./Login.css";

function Login({ onLoginSuccess, navigateTo }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        onLoginSuccess(userData);
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="button" type="submit">
          Login
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <p>
        Not registered yet?{" "}
        <span
          onClick={() => navigateTo("signup")}
          style={{ cursor: "pointer", textDecoration: "underline" }}
        >
          Create an account
        </span>
      </p>
    </div>
  );
}

export default Login;
/** useEffect(() => {
    localStorage.setItem('dataAvailable', JSON.stringify(false));
  }, []); */
