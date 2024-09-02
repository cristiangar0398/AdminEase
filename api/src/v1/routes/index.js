import express from 'express';
import registerController from '../../controllers/registerController.js';

const router = express.Router();
const register = new registerController();

router
    .post("/login", register.Login)
    .post("/singup", register.SingUp);


export default router;