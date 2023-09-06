import * as express from "express";

import { mainController } from '../controllers'
// import { validationData } from '../helpers/middleware'

const mainRouter = express.Router();

mainRouter.post('/login', mainController.postLoginData)
mainRouter.post('/registration', mainController.postRegistrationData)

export default mainRouter