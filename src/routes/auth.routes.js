import { Router } from "express";
import { login, register, logout, profile, verifyToken } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middelware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.get('/logout', logout);
router.get('/profile', authRequired, profile);
router.get('/verify', verifyToken);
router.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});


export default router;
