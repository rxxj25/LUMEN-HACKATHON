// src/routes/auth.js
import express from 'express';
import { login, register } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
// Example protected route:
// router.get('/me', requireAuth, (req, res) => { res.json(req.user); });


export default router;
