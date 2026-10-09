import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearAuthSession } from "../config/api";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const username = localStorage.getItem("userName") || "User";

  useEffect(() => {
    const syncLoginState = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    syncLoginState();
    window.addEventListener("storage", syncLoginState);

    return () => {
      window.removeEventListener("storage", syncLoginState);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    clearAuthSession();
    localStorage.removeItem("agentId");
    localStorage.removeItem("agentName");
    localStorage.removeItem("agentEmail");
    localStorage.removeItem("agentPhone");
    localStorage.removeItem("agentPlaceOfOperation");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setMenuOpen(false);
    navigate("/agent-login");
  };

  const handleMyEnquiries = () => {
    setMenuOpen(false);
    navigate("/my-enquiries");
  };

  const isAgentPage = location.pathname.startsWith("/agent");

  return (
    <header className="header">
      <div>
        <Link to="/">Travel the World</Link>
      </div>

      <div className="header-buttons" style={{ display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
        {location.pathname.startsWith("/agent") ? (
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        ) : isLoggedIn ? (
          <div className="user-menu" ref={menuRef}>
            <div className="user-menu-trigger">
              <span className="username">{username}</span>

              <button
                type="button"
                className="dropdown-toggle"
                aria-label="Toggle user menu"
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                ▾
              </button>
            </div>

            {menuOpen && (
              <div className="user-dropdown">
                {!isAgentPage && (
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={handleMyEnquiries}
                  >
                    My Enquiries
                  </button>
                )}

                <button
                  type="button"
                  className="dropdown-item danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/agent-login">
              <button style={{
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "10px 18px",
                fontWeight: 700,
                cursor: "pointer"
              }}>
                User Login
              </button>
            </Link>

            <Link to="/login"><button style={{ background: "#234543", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 18px", fontWeight: 700, cursor: "pointer", minWidth: "135px" }}>Traveller Login</button></Link>

            <Link to="/signup">
              <button className="join-button">Join for free</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;