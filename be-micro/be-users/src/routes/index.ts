import {
  NextFunction,
  Request, Response,
  Router,
} from 'express';
import {
  createUser, login,
} from '../controllers/users';
import NotFoundError from '../errors/not-found-error';
import auth from '../middlewares/auth';
import { validateUserBody } from '../middlewares/validatons';
import userRouter from './users';

const router = Router();


router.post('/signup', validateUserBody, createUser);
router.post('/users/signup', validateUserBody, createUser);
router.post('/api/users/signup', validateUserBody, createUser);


router.use(auth);
router.use('/api/users', userRouter);
router.use('/users', userRouter);
router.use('/', userRouter);


router.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError('Маршрут не найден'+req.originalUrl));
  console.log('users req Маршрут не найден',req.originalUrl);
});

export default router;
