import express from 'express';
import { ObjectId } from 'mongodb';

const router = express.Router();


//=================================
//              get
//=================================


router.get('/recipe', async (req, res) => {
  try {
    const db = req.app.get('db'); // get reference to the db from app config
    const recipes = await db.collection('recipes').find({}).toArray();

    res.json(recipes);
  } catch(err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get('/recipe/:id', async (req, res) => {
  try {
    const db = req.app.get('db');
    const recipe = await db.collection('recipes').findOne({ _id: new ObjectId(req.params.id) });

    if (recipe) {
      res.json(recipe);
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


router.post('/recipe', async (req, res) => {
  try {
    const db = req.app.get('db');
    console.log(JSON.stringify(req.body, null, '\n'));
    const insertion = await db.collection('recipes').insertOne(req.body);
    if (insertion.acknowledged) {
      const recipe = await db.collection('recipes')
        .findOne({ _id: insertion.insertedId });

      if (recipe) {
        res.status(201).json(recipe);
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


router.put('/recipe/:id', async (req, res) => {
  try {
    const db = req.app.get('db');

    const updateData = req.body;
    delete updateData._id;

    const updated = await db.collection('recipes')
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updateData });

    if (updated.modifiedCount === 1) {
      const user = await db.collection('recipes')
        .findOne({ _id: new ObjectId(req.params.id) });

      if (recipe) {
        res.json(recipe);
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


router.delete('/recipe/:id', async (req, res) => {
  try {
    const db = req.app.get('db');
    const deleted = await db.collection('recipes')
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
