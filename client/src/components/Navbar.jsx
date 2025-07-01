import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth.js';

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  padding: '0 1.2rem',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',
};

const buttonStyle = {
  ...linkStyle,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '0 1.2rem',
};

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{ padding: '0 1rem', background: '#222', color: '#fff', display: 'flex', alignItems: 'center', minHeight: '56px', overflowX: 'auto' }}>
      <div style={{ display: 'flex', flex: 1, flexWrap: 'nowrap' }}>
        <Link to="/" style={linkStyle}>Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/events" style={linkStyle}>Eventos</Link>
            <Link to="/add-event" style={linkStyle}>Agregar Evento</Link>
            <Link to="/profile" style={linkStyle}>Perfil</Link>
            <button onClick={handleLogout} style={buttonStyle}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
