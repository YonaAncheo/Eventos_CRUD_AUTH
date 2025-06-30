import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/events" element={<h1>eventos</h1>} />
      <Route path="/events/:id" element={<h1>eventos por id</h1>} />
      <Route path="/add-event" element={<h1>agregar evento</h1>} />
      <Route path="/profile" element={<h1>perfil</h1>} />

    </Routes>
    </BrowserRouter>
  )
}

export default App