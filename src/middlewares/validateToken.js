import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => {
  const {token} = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "Sin token, autenticación fallida"
    });
  }
  jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Token inválido"
      });
    }
    req.user = decoded;
  });
  next();
}

export default authRequired;