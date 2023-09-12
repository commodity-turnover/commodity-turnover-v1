import express from "express";

import { productController } from '../controllers'
import { verifyTokenMiddleware } from "../helpers/middlewares";



const productRouter = express.Router();

productRouter.get('/products', verifyTokenMiddleware, productController.getAllProducts)
productRouter.get('/products/:id', verifyTokenMiddleware, productController.getProduct)
productRouter.post('/products', verifyTokenMiddleware, productController.addProducts)
productRouter.put('/products/:id', verifyTokenMiddleware, productController.updateProduct)
productRouter.delete('/products/:id', verifyTokenMiddleware, productController.deleteProduct)

export default productRouter