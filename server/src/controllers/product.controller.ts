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

  getProduct = errorHandler(async (req: Request, res: Response) => {
    const productId = req.params.id;
    
    const response = await this.productService.getProduct(req.userId, productId)
    res.status(200).json(response)
  })

  addProducts = errorHandler(async (req: Request, res: Response) => {
    
    const response = await this.productService.addProduct(req.userId, req.body)
    
    res.status(200).json(response)
  })

  updateProduct = errorHandler(async (req: Request, res: Response) => {
    
    const response = await this.productService.updateProduct(req.userId, req.body)
    
    res.status(200).json(response)
  })

  deleteProduct = errorHandler(async (req: Request, res: Response) => {
    const productId = req.params.id;
    
    const response = await this.productService.deleteProduct(req.userId, productId)
    
    res.status(200).json(response)
  })
}
