import express from 'express';
import usersRouter from './routes/users.js';
import recipesRouter from './routes/recipes.js';
import { ObjectId } from 'mongodb';


const router = express.Router();

router.use('/', usersRouter);
router.use('/', recipesRouter);

async function writeAccess(req, res, next) {
  const db = req.app.get('db');
  // in authenticated middlewares (after `oauth.authenticate()`)
  // you will find the token in `res.locals.oauth.token`
  const user = await db.collection('user').findOne({ _id: res.locals?.oauth?.token?.user?.user_id });
  if (user?.permissions?.write) {
    res.locals.user = user; // we store a reference to the user object in `res.locals` for later use
    next();
  } else {
    res.status(403).send();
  }
}

router.post('/todo', writeAccess, async (req, res) => {
  try {
    const db = req.app.get('db');
    const insertion = await db.collection('todo').insertOne({
      ...req.body,
      creator_id: res.locals.user._id,
    });

    if (insertion.acknowledged) {
      const todo = await db.collection('todo').findOne({ _id: insertion.insertedId });

      if (todo) {
        res.status(201).json(todo);
      } else {
        res.status(404).send();
      }
    } else {
      res.status(500).send();
    }
  } catch(err) {
    console.error(err);
    res.status(500).send();
  }
});

export default router;