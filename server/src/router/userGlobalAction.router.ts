import express from "express";

import { userGlobalAction } from '../controllers'
import { verifyTokenMiddleware } from "../helpers/middlewares";

const userGlobalActionRouter = express.Router();

userGlobalActionRouter.get('/news', userGlobalAction.getNews)
// userGlobalActionRouter.get('/search-products', userGlobalAction.postRegistrationData)
userGlobalActionRouter.get('/search-partners', verifyTokenMiddleware, userGlobalAction.searchPartners)
userGlobalActionRouter.post('/activate', verifyTokenMiddleware, userGlobalAction.activateUser)
userGlobalActionRouter.post('/update-account', verifyTokenMiddleware, userGlobalAction.updateAccount)
userGlobalActionRouter.delete('/delete-account', verifyTokenMiddleware, userGlobalAction.deleteAccount)

export default userGlobalActionRouter