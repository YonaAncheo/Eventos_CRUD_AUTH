import { Link } from "react-router-dom";

const Navbar = () => (
  <nav style={{ padding: "1rem", background: "#222", color: "#fff" }}>
    <Link to="/" style={{ margin: "0 1rem", color: "#fff", textDecoration: "none" }}>Home</Link>
    <Link to="/register" style={{ margin: "0 1rem", color: "#fff", textDecoration: "none" }}>Register</Link>
    <Link to="/login" style={{ margin: "0 1rem", color: "#fff", textDecoration: "none" }}>Login</Link>
    <Link to="/profile" style={{ margin: "0 1rem", color: "#fff", textDecoration: "none" }}>Profile</Link>
    <Link to="/add-event" style={{ margin: "0 1rem", color: "#fff", textDecoration: "none" }}>Add Event</Link>
  </nav>
);

export default Navbar;
