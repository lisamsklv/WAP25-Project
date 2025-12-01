import express from 'express';
import { ObjectId } from 'mongodb';

const router = express.Router();


//=================================
//              get
//=================================


router.get('/user', async (req, res) => {
  try {
    const db = req.app.get('db'); // get reference to the db from app config
    const users = await db.collection('users').find({}).toArray();

    res.json(users);
  } catch(err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const db = req.app.get('db');
    const user = await db.collection('users').findOne({ _id: new ObjectId(req.params.id) });

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


//=================================
//              post
//=================================


router.post('/user', async (req, res) => {
  try {
    const db = req.app.get('db');
    console.log(JSON.stringify(req.body, null, '\n'));
    const insertion = await db.collection('users').insertOne(req.body);
    if (insertion.acknowledged) {
      const user = await db.collection('users')
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


//=================================
//              put
//=================================


router.put('/user/:id', async (req, res) => {
  try {
    const db = req.app.get('db');

    const updateData = req.body;
    delete updateData._id;

    const updated = await db.collection('users')
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updateData });

    if (updated.modifiedCount === 1) {
      const user = await db.collection('users')
        .findOne({ _id: new ObjectId(req.params.id) });

      if (user) {
        res.json(user);
      } else {
        res.status(404).send();
      }
    } else {
      res.status(404).send();
    }
  } catch(err) {
    console.error(err);
    res.status(500).send();
  }
});


//=================================
//             delete
//=================================


router.delete('/user/:id', async (req, res) => {
  try {
    const db = req.app.get('db');
    const deleted = await db.collection('users')
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (deleted.deletedCount === 1) {
      res.send();
    } else {
      res.status(404).send();
    }
  } catch(err) {
    console.error(err);
    res.status(500).send();
  }
});

export default router;
