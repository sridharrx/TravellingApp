import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "https://travellingappbackend.onrender.com").replace(/\/+$/, "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.removeItem("isLoggedIn");
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);

    try {
      await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
    } catch (error) {
      console.error("Signup error:", error);
    }

    navigate("/login");
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
    </div>
  );
}

export default Signup;