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
router.use('/cards', cardRouter);
router.use('/', cardRouter);




router.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError('Маршрут не найден'+req.originalUrl));
  console.log('cards req Маршрут не найден',req.originalUrl);
});

export default router;
