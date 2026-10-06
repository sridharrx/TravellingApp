import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { API_BASE_URL, apiFetch } from "../config/api";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    const signupData = {
      name,
      email,
      password,
    };

    try {
      const response = await apiFetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("Signup successful!");

      setName("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Unable to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <Loader text="Creating account..." />}

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
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
        </div>

        <br />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <div className="auth-topbar">
        <Link to="/" className="home-link">Home</Link>
      </div>
    </div>
  );
}

export default Signup;