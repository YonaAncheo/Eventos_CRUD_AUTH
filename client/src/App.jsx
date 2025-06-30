import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AddEvent from './pages/AddEvent';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/events" element={<h1>listar eventos</h1>} />
          <Route path="/add-event" element={<AddEvent />} />
          <Route path="/events/:id" element={<h1>listar evento con ID</h1>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;