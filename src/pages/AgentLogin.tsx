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
    <div>

      <h1>Agent Login</h1>

      <form onSubmit={handleLogin}>

        <div>
          <label>Username</label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        <button type="submit">
          Agent Login
        </button>

      </form>

    </div>
  );
}

export default AgentLogin;