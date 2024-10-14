import {
  NextFunction,
  Request, Response,
  Router,
} from 'express';

import NotFoundError from '../errors/not-found-error';
import auth from '../middlewares/auth';

import cardRouter from './cards';


const router = Router();

router.use(auth);
router.use('/api/cards', cardRouter);



router.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError('Маршрут не найден'+req.url));
});

export default router;
