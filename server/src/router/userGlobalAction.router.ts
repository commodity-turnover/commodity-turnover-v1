import express from "express";

import { userGlobalAction } from '../controllers'
import { verifyTokenMiddleware } from "../helpers/middlewares";

const userGlobalActionRouter = express.Router();

userGlobalActionRouter.get('/news', userGlobalAction.getNews)
// userGlobalActionRouter.get('/search-products', userGlobalAction.postRegistrationData)
userGlobalActionRouter.get('/search-partners', verifyTokenMiddleware, userGlobalAction.getPartners)
userGlobalActionRouter.post('/activate', verifyTokenMiddleware, userGlobalAction.postActivate)

export default userGlobalActionRouter