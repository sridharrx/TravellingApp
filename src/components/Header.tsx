import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div>
        <Link to="/">Travel To Maldives</Link>
      </div>

      <div>
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