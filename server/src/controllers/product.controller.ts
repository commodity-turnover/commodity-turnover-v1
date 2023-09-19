import { Request, Response } from 'express'

import { errorHandler } from '../helpers/errorHandler'
// import { sendResponse } from '../helpers/functions'

export class ProductController {
  constructor(private productService:any) {}

  getAllProducts = errorHandler(async (req: Request, res: Response) => {
    const {productName, sortType} = req.query;    

    const response = await this.productService.getAllProducts(req.userId, productName, sortType)
    // sendResponse(null, res, 201, userData)
    res.status(200).json(response)
  })

  getProductById = errorHandler(async (req: Request, res: Response) => {
    const productId = req.params.id;
    
    const response = await this.productService.getProductById(req.userId, productId)
    
    res.status(200).json(response)
  })

  addProduct = errorHandler(async (req: Request, res: Response) => {
    const response = await this.productService.addProduct(req.userId, req.body)
    
    res.status(200).json(response)
  })

  updateProductById = errorHandler(async (req: Request, res: Response) => {
    
    const response = await this.productService.updateProductById(req.userId, req.body)
    
    res.status(200).json(response)
  })

  deleteProductById = errorHandler(async (req: Request, res: Response) => {
    const productId = req.params.id;
    
    const response = await this.productService.deleteProductById(req.userId, productId)
    
    res.status(200).json(response)
  })
}
