import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AgentLogin() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "agent" && password === "agent4321") {
      navigate("/agent");
      return;
    }

    alert("Invalid agent username or password");
  };

  return (
    <div style={{ maxWidth: "420px", margin: "40px auto", padding: "0 16px" }}>

      <h1 style={{ textAlign: "center", marginBottom: "24px" }}>Agent Login</h1>

      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label>Username</label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        <button type="submit" style={{ marginTop: "8px" }}>
          Agent Login
        </button>

      </form>

    </div>
  );
}

export default AgentLogin;