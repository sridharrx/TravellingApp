import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault();

  const signupData = {
    name,
    email,
    password
  };

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(signupData)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Signup failed");
      return;
    }

    alert("Signup successful!");

    // Clear form
    setName("");
    setEmail("");
    setPassword("");

    navigate("/login");

  } catch (error) {
    console.error("Signup error:", error);
    alert("Unable to connect to server");
  }
};

  return (
    <div>
      <h2>Sign Up</h2>

      <form onSubmit={handleSignup}>
        <div>
          <label>Full Name</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Sign Up</button>
      </form>

      <div className="auth-topbar">
        <Link to="/" className="home-link">Home</Link>
      </div>
    </div>
  );
}

export default Signup;