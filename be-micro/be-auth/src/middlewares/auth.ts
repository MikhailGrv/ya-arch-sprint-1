import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../config';
import UnauthorizedError from '../errors/unauthorized-error';

interface JwtPayload {
  _id: string
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  let payload: JwtPayload | null = null;
  try {
    payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = payload;
    next();
  } catch (e) {
    next(new UnauthorizedError('be_auth Необходима авторизация' + req.originalUrl));
    console.log('be_auth req Необходима авторизация', req.originalUrl);
  }
};

export default auth;
