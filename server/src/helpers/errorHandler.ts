import { Request, Response } from 'express'
// import { sendResponse } from "./functions";

type controller = (req: Request, res: Response) => Promise<void>

export const errorHandler = (controller: controller) => async (
  req: Request,
  res: Response,
) => {
  try {
    await controller(req, res)
  } catch (error) {
    const castedError = error as Error
    res.status(500).json({ message: 'Error message', error: castedError.message })
    // sendResponse(error, res)
  }
}
