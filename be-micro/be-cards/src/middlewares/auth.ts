import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../config';
import UnauthorizedError from '../errors/unauthorized-error';

interface JwtPayload {
  _id: string
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  var token = req.cookies.jwt;
  console.log('users auth coockie jwt', req.cookies.jwt)
  console.log('users auth headers authorization', req.headers.authorization);
  if(req.headers.authorization) {
    console.log('users auth headers authorization jwt', req.headers.authorization?.substring(7, req.headers.authorization?.length));

    if(!token && req.headers.authorization?.startsWith('Bearer'))
      token = req.headers.authorization?.substring(7, req.headers.authorization.length);
    else if(!token && req.headers.authorization)
      token = req.headers.authorization;
  }
  let payload: JwtPayload | null = null;
  try {
    payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = payload;
    next();
  } catch (e) {
    next(new UnauthorizedError('Необходима авторизация'+req.originalUrl));
  }
};

export default auth;
