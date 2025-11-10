import express from 'express';
import usersRouter from './routes/users.js';
import recipesRouter from './routes/recipes.js';

const apiRouter = express.Router();

apiRouter.use('/', usersRouter);
apiRouter.use('/', recipesRouter);

export default apiRouter;