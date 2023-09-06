import { Request, Response } from 'express'

import { errorHandler } from '../helpers/errorHandler'
import { sendResponse } from '../helpers/functions'

export class MainController {
  constructor(private mainService:any) {}

  postLoginData = errorHandler(async (req: Request, res: Response) => {
    const response = await this.mainService.getUser(req.body)
    // sendResponse(null, res, 201, userData)
    
    res.status(201).json(response)
  })

  postRegistrationData = errorHandler(async (req: Request, res: Response) => {
    await this.mainService.createUser(req.body)
    sendResponse(null, res, 201, 'User created successfully!')
  })

}
