import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { API_BASE_URL, extractJwtToken, setStoredToken } from "../config/api";

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
      let url = `${API_BASE_URL}/api/auth/login`;
      // In dev, prefer IPv4 loopback to avoid servers bound only to 127.0.0.1
      if (import.meta.env.DEV) {
        url = url.replace("localhost", "127.0.0.1");
      }

      console.log("Agent login request ->", url, { email });

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        let userData: Record<string, any> | null = null;

        try {
          userData = await response.json();
        } catch {
          userData = null;
        }

        const token = extractJwtToken(response, userData);
        if (token) {
          setStoredToken(token);
        }

        const savedUserEmail = userData?.user?.email ?? userData?.email ?? email;

        const fallbackUserName = savedUserEmail?.split("@")[0]?.trim() || "User";

        const savedUserName = userData?.user?.name ?? userData?.name ?? fallbackUserName;

        localStorage.setItem("userName", savedUserName);
        localStorage.setItem("userEmail", savedUserEmail);
        localStorage.setItem("isLoggedIn", "true");

        const role = userData?.user?.role ?? userData?.role ?? "";

        setIsLoading(false);

        if (role === "AGENT") {
          navigate("/agent");
          return;
        }

        setMessage("Account is not an agent account");
        return;
      }

      // Log response information for debugging when not OK
      const respText = await response.text();
      console.log("Agent login failed. status:", response.status);
      console.log("Response headers:");
      response.headers.forEach((v, k) => console.log(k, v));
      console.log("Response body:", respText);

      setMessage(respText || "Invalid email or password");
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
          />
        </div>

        <button type="submit" style={{ marginTop: "8px" }} disabled={isLoading}>
          {isLoading ? "Checking..." : "Agent Login"}
        </button>

      </form>

      {message && (
        <p style={{ textAlign: "center", color: "red", marginTop: 12 }}>{message}</p>
      )}

      <div style={{ marginTop: 16, textAlign: "center" }}>
        <span>New agent? </span>
        <Link to="/agent-signup">Sign up as an agent</Link>
      </div>

      <div className="auth-topbar" style={{ marginTop: 12, textAlign: "center" }}>
        <Link to="/" className="home-link">Home</Link>
      </div>

    </div>
  );
}

export default AgentLogin;