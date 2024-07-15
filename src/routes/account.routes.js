import express from 'express';
import { createAccount, getAccounts, deleteAccount } from '../controllers/account.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Ruta para crear una nueva cuenta
router.post('/accounts', auth, createAccount);

// Ruta para obtener todas las cuentas del usuario
router.get('/accounts', auth, getAccounts);

// Ruta para eliminar una cuenta
router.delete('/accounts/:id', auth, deleteAccount);

export default router;
