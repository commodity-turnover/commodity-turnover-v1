import { Request, Response } from 'express'

import { errorHandler } from '../helpers/errorHandler'
import UserGlobalActionService from '../services/userGlobalAction.service'

export class UserGlobalActionController {
  constructor(private userGlobalActionService: UserGlobalActionService) {}

  getNews = errorHandler(async (req: Request, res: Response) => {
    const response = await this.userGlobalActionService.getNews()
    res.status(200).json(response)
  })

  searchPartners = errorHandler(async (req: Request, res: Response) => {
    const response = await this.userGlobalActionService.searchPartners(req.userId)
    res.status(200).json(response)
  })

  activateUser = errorHandler(async (req: Request, res: Response) => {
    const isActiveData = req.body.isActive;
    const response = await this.userGlobalActionService.activateUser(req.userId, isActiveData)    
    res.status(200).json(response)
  })
}
