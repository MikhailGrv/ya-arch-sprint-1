import {
  NextFunction,
  Request, Response,
  Router,
} from 'express';
import {
   login,
} from '../controllers/users';
import NotFoundError from '../errors/not-found-error';
import auth from '../middlewares/auth';
import { validateAuthentication } from '../middlewares/validatons';

const router = Router();

router.post('/api/signin', validateAuthentication, login);
router.post('/signin', validateAuthentication, login);

router.use(auth);





router.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError('Маршрут не найден'+req.originalUrl));
  console.log('users req Маршрут не найден',req.originalUrl);
});

export default router;
