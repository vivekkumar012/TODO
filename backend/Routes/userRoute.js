import express from 'express'
import { login, logout, register } from '../Controllers/userController.js';

const userRoute = express.Router();

userRoute.post("/signup", register);
userRoute.post("/login", login);
userRoute.get("/logout", logout);

export default userRoute;