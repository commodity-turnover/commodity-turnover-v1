import { Request, Response } from 'express'

import { errorHandler } from '../helpers/errorHandler'

export class UserGlobalActionController {
  constructor(private userGlobalActionService:any) {}

  getNews = errorHandler(async (req: Request, res: Response) => {
    const response = await this.userGlobalActionService.getNews()
    res.status(200).json(response)
  })

  getPartners = errorHandler(async (req: Request, res: Response) => {
    const response = await this.userGlobalActionService.getPartners(req.userId)
    res.status(200).json(response)
  })
}
