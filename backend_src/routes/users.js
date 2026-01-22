import express from 'express';
import { ObjectId } from 'mongodb';

const router = express.Router();

// GET all profiles
router.get('/user', async (req, res) => {
  try {
    const db = req.app.get('db');
    const users = await db.collection('user_auth').find({}).toArray();
    res.json(users);
  } catch(err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const db = req.app.get('db');
    const user = await db.collection('user_auth').findOne({ _id: new ObjectId(req.params.id) });

    if (user) {
      res.json(user);
    } else {
      res.status(404).send();
    }
  } catch(err) {
    console.error(err);
    res.status(500).send();
  }
});


// POST
router.post('/user', async (req, res) => {
  try {
    const db = req.app.get('db');
    console.log(JSON.stringify(req.body, null, '\n'));
    const insertion = await db.collection('user_auth').insertOne(req.body);
    if (insertion.acknowledged) {
      const user = await db.collection('user_auth')
        .findOne({ _id: insertion.insertedId });

      if (user) {
        res.status(201).json(user);
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