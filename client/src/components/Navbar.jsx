import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth.js';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{ padding: '1rem', background: '#222', color: '#fff' }}>
      <Link to="/" style={{ margin: '0 1rem', color: '#fff', textDecoration: 'none' }}>Home</Link>
      {isAuthenticated ? (
        <>
          <Link to="/events" style={{ margin: '0 1rem', color: '#fff', textDecoration: 'none' }}>Eventos</Link>
          <Link to="/add-event" style={{ margin: '0 1rem', color: '#fff', textDecoration: 'none' }}>Agregar Evento</Link>
          <Link to="/profile" style={{ margin: '0 1rem', color: '#fff', textDecoration: 'none' }}>Perfil</Link>
          <button onClick={handleLogout} style={{ margin: '0 1rem', color: '#fff', background: 'none', border: 'none', cursor: 'pointer' }}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ margin: '0 1rem', color: '#fff', textDecoration: 'none' }}>Login</Link>
          <Link to="/register" style={{ margin: '0 1rem', color: '#fff', textDecoration: 'none' }}>Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
