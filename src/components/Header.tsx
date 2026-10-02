import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
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
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setMenuOpen(false);
    navigate("/login");
  };

  const handleMyEnquiries = () => {
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="header">
      <div>
        <Link to="/">Travel the World</Link>
      </div>

      <div className="header-buttons">
        {isLoggedIn ? (
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
                <button
                  type="button"
                  className="dropdown-item"
                  onClick={handleMyEnquiries}
                >
                  My Enquiries
                </button>

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
              <button>Agent Login</button>
            </Link>

            <Link to="/login">
              <button>Login</button>
            </Link>

            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;