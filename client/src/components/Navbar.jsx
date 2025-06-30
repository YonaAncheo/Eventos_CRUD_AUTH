import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav style={{ padding: "1rem", background: "#222", color: "#fff" }}>
      <Link to="/" style={{ margin: "0 1rem", color: "#fff", textDecoration: "none" }}>Home</Link>
      {!user && <>
        <Link to="/register" style={{ margin: "0 1rem", color: "#fff", textDecoration: "none" }}>Register</Link>
        <Link to="/login" style={{ margin: "0 1rem", color: "#fff", textDecoration: "none" }}>Login</Link>
      </>}
      {user && <>
        <Link to="/profile" style={{ margin: "0 1rem", color: "#fff", textDecoration: "none" }}>Profile</Link>
        <button onClick={logout} style={{ margin: "0 1rem", color: "#fff", background: "none", border: "none", cursor: "pointer" }}>Logout</button>
      </>}
      <Link to="/add-event" style={{ margin: "0 1rem", color: "#fff", textDecoration: "none" }}>Add Event</Link>
    </nav>
  );
};

export default Navbar;
