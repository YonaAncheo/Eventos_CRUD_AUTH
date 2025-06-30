import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import  jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';


export const register = async (req,res) => {
  const {email, password, username} = req.body;
  try {
    const userFound = await User.findOne({email});
    if (userFound) {
      return res.status(400).json({
        message: 'El usuario ya existe'
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    
    const newUser = new User({
      username,
      email,
      password: passwordHash
  
    });
    const userSaved = await newUser.save();
    const token = await createAccessToken({id: userSaved._id})

    res.cookie('token', token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error al registrar el usuario',
      error: error.message
    });
  }
}

export const login = async (req,res) => {
  const {email, password} = req.body;
  try {
    const userFound = await User.findOne({email});
    if (!userFound) {
      return res.status(400).json({
        message: 'Usuario no encontrado'
      });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(400).json({
        message: 'Credenciales incorrectas'
      });
    }
    
    const token = await createAccessToken({id: userFound._id})

    res.cookie('token', token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error al registrar el usuario',
      error: error.message
    });
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    return res.status(200).json({
      message: 'Sesión cerrada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al cerrar sesión',
      error: error.message
    });
  }
}

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) {
    return res.status(404).json({
      message: 'Usuario no encontrado'
    });
  }

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt
  });
}

export const verifyToken = async (req, res) => {
  // Obtener token de cookie o header
  let token = req.cookies.token;
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const userFound = await User.findById(decoded.id);
    if (!userFound) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({
      id: decoded.id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};