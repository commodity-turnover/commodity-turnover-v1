import { Response } from "express";
import jwt from 'jsonwebtoken'

import { jwtSecretKey } from "../constants/const";
import { AppError } from "./AppError";

export function sendResponse(err: AppError | null, res: Response, status: number = 200, message: any = '') {
  if(err) {
    res.status(err.statusCode).send(err.message)
  } else {
    res.status(status).send(message)
  }
}

export const createToken = (user_id:any) => {
  const accessToken = jwt.sign({ user_id }, jwtSecretKey, {
    // expiresIn: 300,
  })

  return accessToken;
}

// const createTokens = (id) => {
//   const accessToken = sign(
//     { id },
//     "jwtsecret",
//     {
//         expiresIn: "6h",
//     }
//   );
//   return accessToken;
// };