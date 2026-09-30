import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div>
        <Link to="/">Travel the World</Link>
      </div>

      <div className="header-buttons">
        <Link to="/login">
          <button>Login</button>
        </Link>

        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;