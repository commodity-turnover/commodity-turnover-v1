import { Request, Response } from 'express'

import { errorHandler } from '../helpers/errorHandler'
// import { sendResponse } from '../helpers/functions'

export class MainController {
  constructor(private mainService:any) {}

  loginUser = errorHandler(async (req: Request, res: Response) => {
    const response = await this.mainService.loginUser(req.body)
    // sendResponse(null, res, 201, userData)
    res.status(201).json(response)
  })

  registerUser = errorHandler(async (req: Request, res: Response) => {
    const response = await this.mainService.registerUser(req.body)
    res.status(201).send(response)
  })

  getUserData = errorHandler(async (req: Request, res: Response) => {
    const response = await this.mainService.getUser(req.userId)
    res.status(201).send(response)
  })
}
