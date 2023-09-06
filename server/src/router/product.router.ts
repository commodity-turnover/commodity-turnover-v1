import express from "express";

import { productController } from '../controllers'
import { verifyTokenMiddleware } from "../helpers/middlewares";



const productRouter = express.Router();

productRouter.get('/products', verifyTokenMiddleware, productController.getAllProducts)

export default productRouter