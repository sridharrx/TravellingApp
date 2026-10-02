import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AgentLogin from "./pages/AgentLogin";
import AgentPage from "./pages/AgentPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/agent-login" element={<AgentLogin />} />

                <Route path="/agent" element={<AgentPage />} />

                <Route path="/signup" element={<Signup />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;