import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";
import { API_BASE_URL, apiFetch } from "../config/api";

function AgentSignup() {
  const navigate = useNavigate();
  const [agentName, setAgentName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [placeOfOperation, setPlaceOfOperation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    const signupData = {
      agentName,
      email,
      phone,
      placeOfOperation,
      password,
    } as Record<string, unknown>;

    try {
      const response = await apiFetch(`${API_BASE_URL}/api/auth/agent/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Agent signup failed");
        return;
      }

      // clear form then navigate to agent login with a success flag
      setAgentName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setPlaceOfOperation("");

      navigate("/agent-login?signup=success");
    } catch (error) {
      console.error("Agent signup error:", error);
      alert("Unable to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "520px", margin: "40px auto", padding: "0 16px" }}>
      {isLoading && <Loader text="Creating agent account..." />}

      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Agent Signup</h2>

      <form onSubmit={handleSignup}>
        <div>
          <label>Agent Name</label>
          <br />
          <input
            type="text"
            name="agentName"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
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
            name="email"
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
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <br />

        <div>
          <label>Phone</label>
          <br />
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <br />

        <div>
          <label>Place of Operation</label>
          <br />
          <input
            type="text"
            name="placeOfOperation"
            value={placeOfOperation}
            onChange={(e) => setPlaceOfOperation(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <br />

        <button type="submit" className="join-button" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create Agent Account"}
        </button>
      </form>

        <div className="auth-topbar" style={{ marginTop: 16 }}>
            <Link to="/" className="home-link">Home</Link>
        </div>

      </div>
  );
}

export default AgentSignup;
