import { Request, Response } from 'express'

import { errorHandler } from '../helpers/errorHandler'
// import { sendResponse } from '../helpers/functions'

export class ProductController {
  constructor(private productService:any) {}

  getAllProducts = errorHandler(async (req: Request, res: Response) => {
    const response = await this.productService.getAllProducts(req.userId)
    // sendResponse(null, res, 201, userData)
    res.status(200).json(response)
  })
}
