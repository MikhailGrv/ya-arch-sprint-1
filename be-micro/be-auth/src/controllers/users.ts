import bcrypt from 'bcryptjs';
import {
  NextFunction,
  Request,
  Response,
} from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';
import NotFoundError from '../errors/not-found-error';
import User from '../models/user';

const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
      
    
      res
        // .cookie('jwt', token, {

        //   maxAge: 3600000,
        //   httpOnly: true, 
        //   sameSite: true,
        // })
        .send({ data: user.toJSON(), token: token });

        
    })
    .catch(next);
};



export {
  login
};
