import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();
    const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "https://travellingappbackend.onrender.com").replace(/\/+$/, "");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e: React.FormEvent) => {

        e.preventDefault();

        setMessage("");

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

                // Go to Home page
                navigate("/");

                return;
            }

            const data = await response.text();

            setMessage(data || "Invalid email or password");

        } catch (error) {

            console.error("Login error:", error);

            setMessage("Unable to connect to server");
        }
    };

    return (
        <div>

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

                <button type="submit">
                    Login
                </button>

            </form>

            {message && (
                <p>{message}</p>
            )}

        </div>
    );
}

export default Login;