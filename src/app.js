import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import csurf from 'csurf';
import authRoutes from './routes/auth.routes.js';
import eventRoutes from './routes/events.routes.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Cambia esto al origen de tu cliente
  credentials: true, // Permite el envío de cookies
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Protección CSRF solo para rutas que no sean login/register
app.use((req, res, next) => {
  const csrfExcluded =
    (req.method === 'POST' && req.path === '/api/login') ||
    (req.method === 'POST' && req.path === '/api/register');
  if (csrfExcluded) return next();
  return csurf({ cookie: true })(req, res, next);
});

app.use('/api', authRoutes);
app.use('/api', eventRoutes);

// Middleware para manejar errores CSRF
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ message: 'Invalid CSRF token' });
  }
  next(err);
});

export default app;