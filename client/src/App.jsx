import { Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import EventPage from './pages/EventPage';
import EventFormPage from './pages/EventFormPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './pages/ProtectedRoute';
import Navbar from './components/Navbar';


function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
          <Route path="/events" element={<EventPage />} />
          <Route path="/events/:id" element={<EventFormPage/>} />
          <Route path="/add-event" element={<EventFormPage/>} />
          <Route path="/profile" element={<ProfilePage />} />

        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App