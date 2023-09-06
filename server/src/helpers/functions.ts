import { Response } from "express";
import { AppError } from "./AppError";

export function sendResponse(err: AppError | null, res: Response, status: number = 200, message: any = '') {
  if(err) {
    res.status(err.statusCode).send(err.message)
  } else {
    res.status(status).send(message)
  }
}