import express from 'express';
import { login, refreshToken, register, signout } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/signout', signout);
router.post('/refresh', refreshToken);

export default router;