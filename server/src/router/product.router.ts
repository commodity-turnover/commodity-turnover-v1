import express from "express";

import { productController } from '../controllers'
import { verifyTokenMiddleware } from "../helpers/middlewares";

const productRouter = express.Router();

productRouter.get('/products', verifyTokenMiddleware, productController.getAllProducts)
productRouter.get('/products/:id', verifyTokenMiddleware, productController.getProductById)
productRouter.post('/products', verifyTokenMiddleware, productController.addProduct)
productRouter.put('/products/:id', verifyTokenMiddleware, productController.updateProductById)
productRouter.delete('/products/:id', verifyTokenMiddleware, productController.deleteProductById)

export default productRouter