import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors, VerifyOptions } from 'jsonwebtoken'

declare global {
    namespace Express {
      interface Request {
        userId?: string; // Add your custom property here
      }
    }
  }

export const verifyTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    
    const token = req.headers["access-token"] as string
    

    if(!token) {
        return res.status(401).json({message: 'Unauthorized'})
    } else {
        jwt.verify(token, "jwtSecretKey", (err: VerifyErrors | null, decoded: any) => {
            if(err) {
                return res.status(403).json({message: "Unauthorized"})
            } else {
                req.userId = decoded.user_id;
                next()
            }
        })
    }
}

