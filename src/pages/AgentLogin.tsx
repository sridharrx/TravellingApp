import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { API_BASE_URL } from "../config/api";

function AgentLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const signupSuccess = params.get("signup") === "success";


const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  if (isLoading) return;

  setMessage("");
  setIsLoading(true);

  try {
    let url = `${API_BASE_URL}/api/auth/agent/login`;

    if (import.meta.env.DEV) {
      url = url.replace("localhost", "127.0.0.1");
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message || "Invalid email or password");
      return;
    }


localStorage.setItem("agentId", String(data.id));
localStorage.setItem("agentName", data.agentName);
localStorage.setItem("agentEmail", data.email);
localStorage.setItem("agentPhone", data.phone ?? "");
localStorage.setItem(
  "agentPlaceOfOperation",
  data.placeOfOperation ?? ""
);
localStorage.setItem("userRole", "AGENT");
localStorage.setItem("isLoggedIn", "true");

navigate("/agent");

  } catch (error) {
    console.error("Agent login error:", error);
    setMessage("Unable to connect to server");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div style={{ maxWidth: "420px", margin: "40px auto", padding: "0 16px" }}>
      {isLoading && <Loader text="Checking credentials..." />}

      <h1 style={{ textAlign: "center", marginBottom: "24px" }}>Agent Login</h1>

      {signupSuccess && (
        <div style={{ textAlign: "center", color: "green", marginBottom: 12 }}>
          Agent account created — please login.
        </div>
      )}

      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            disabled={isLoading}
            required
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            disabled={isLoading}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            marginTop: "8px",
            background: "#3b82f6",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            padding: "12px 18px",
            fontSize: "1rem",
            fontWeight: 700,
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.8 : 1,
          }}
          disabled={isLoading}
        >
          {isLoading ? "Checking..." : "Agent Login"}
        </button>

      </form>

      {message && (
        <p style={{ textAlign: "center", color: "red", marginTop: 12 }}>{message}</p>
      )}

      <div style={{ marginTop: 16, textAlign: "center" }}>
        <span>New agent? </span>
         <Link
    to="/agent-signup"
    style={{
      display: "inline-block",
      marginLeft: "6px",
      padding: "8px 14px",
      background: "linear-gradient(to bottom, #38bdf8, #0284c7)",
      color: "#ffffff",
      textDecoration: "none",
      fontWeight: 600,
      borderRadius: "8px",
      boxShadow: "0 3px 8px rgba(0, 0, 0, 0.2)",
    }}
  >
    Sign up as an agent
  </Link>
      </div>

      <div className="auth-topbar" style={{ marginTop: 12, textAlign: "center" }}>
        <Link to="/" className="home-link">Home</Link>
      </div>

    </div>
  );
}

export default AgentLogin;