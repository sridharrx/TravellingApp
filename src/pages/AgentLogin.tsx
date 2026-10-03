import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function AgentLogin() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 900));

    if (username === "agent" && password === "agent12345") {
      setIsLoading(false);
      navigate("/agent");
      return;
    }

    setIsLoading(false);
    alert("Invalid agent username or password");
  };

  return (
    <div style={{ maxWidth: "420px", margin: "40px auto", padding: "0 16px" }}>
      {isLoading && <Loader text="Checking credentials..." />}

      <h1 style={{ textAlign: "center", marginBottom: "24px" }}>Agent Login</h1>

      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label>Username</label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            disabled={isLoading}
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
          />
        </div>

        <button type="submit" style={{ marginTop: "8px" }} disabled={isLoading}>
          {isLoading ? "Checking..." : "Agent Login"}
        </button>

      </form>

    </div>
  );
}

export default AgentLogin;