import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { API_BASE_URL, extractJwtToken, setStoredToken } from "../config/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {

        e.preventDefault();

        if (isLoading) return;

        setMessage("");
        setIsLoading(true);

        try {

            const response = await fetch(
                `${API_BASE_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

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

                const savedUserEmail =
                    userData?.user?.email ??
                    userData?.email ??
                    email;

                const fallbackUserName =
                    savedUserEmail?.split("@")[0]?.trim() || "User";

                const savedUserName =
                    userData?.user?.name ??
                    userData?.name ??
                    fallbackUserName;

                localStorage.setItem("userName", savedUserName);
                localStorage.setItem("userEmail", savedUserEmail);
                localStorage.setItem("isLoggedIn", "true");

                setIsLoading(false);
                navigate("/");

                return;
            }

            const data = await response.text();

            setMessage(data || "Invalid email or password");

        } catch (error) {

            console.error("Login error:", error);

            setMessage("Unable to connect to server");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {isLoading && <Loader text="Logging in..." />}

            <h2>Login</h2>

            <form onSubmit={handleLogin}>

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
                    {isLoading ? "Logging in..." : "Login"}
                </button>

            </form>

            {message && (
                <p>{message}</p>
            )}

            <div className="auth-topbar">
                <Link to="/" className="home-link">Home</Link>
            </div>

        </div>
    );
}

export default Login;