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
import { validateAuthentication, validateUserBody } from '../middlewares/validatons';
import userRouter from './users';

const router = Router();
router.post('/api/signup', validateUserBody, createUser);
router.post('/api/signin', validateAuthentication, login);

router.use(auth);
router.use('/api/users', userRouter);



router.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError('Маршрут не найден'+req.url));
});

export default router;
