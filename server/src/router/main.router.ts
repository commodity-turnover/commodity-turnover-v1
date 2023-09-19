import express from "express";

import { mainController } from '../controllers'
import { verifyTokenMiddleware } from "../helpers/middlewares";
// import { validationData } from '../helpers/middleware'

const mainRouter = express.Router();

mainRouter.post('/login', mainController.loginUser)
mainRouter.post('/registration', mainController.registerUser)
mainRouter.get('/home', verifyTokenMiddleware, mainController.getUserData)

export default mainRouter