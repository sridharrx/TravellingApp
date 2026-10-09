import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AgentLogin from "./pages/AgentLogin";
import LandingPage from "./pages/LandingPage";
import MyEnquiries from "./pages/MyEnquiries";
import AgentSignup from "./pages/AgentSignup";
import AgentDashboard from "./pages/AgentDashboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/landing" element={<LandingPage />} />

                <Route path="/my-enquiries" element={<MyEnquiries />} />
                <Route path="/new-enquiry" element={<LandingPage />} />

                <Route path="/agent-login" element={<AgentLogin />} />

                <Route path="/agent" element={<AgentDashboard />} />

                <Route path="/signup" element={<Signup />} />
                <Route path="/agent-signup" element={<AgentSignup />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;