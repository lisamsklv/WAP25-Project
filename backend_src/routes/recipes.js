import express from 'express';
import { ObjectId } from 'mongodb';
import { writeAccess } from '../api.js';

const router = express.Router();

// get
router.get('/recipe', async (req, res) => {
  try {
    const db = req.app.get('db');
    const recipes = await db.collection('recipes').find({}).toArray();
    res.json(recipes);
  } catch (err) {
    res.status(500).send();
  }
});

// get
router.get('/recipe/:id', async (req, res) => {
  try {
    const db = req.app.get('db');
    const recipe = await db.collection('recipes').findOne({ _id: new ObjectId(req.params.id) });
    recipe ? res.json(recipe) : res.status(404).send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get('/recipe/category/:category', async (req, res) => {
  try {
    const db = req.app.get('db');
    const category = req.params.category;

    const recipes = await db.collection('recipes')
      .find({ category: category })
      .toArray();

    if (recipes.length > 0) {
      res.json(recipes);
    } else {
      res.status(404).json({ message: 'No recipes found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get('/recipe/search', async (req, res) => {
  try {
    const db = req.app.get('db');
    const q = req.query.q;

    if (!q || q.trim() === '') {
      return res.json([]);
    }

    const recipes = await db.collection('recipes')
      .find({
        title: { $regex: q, $options: 'i' }, // case‑insensitive
      })
      .toArray();

    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// // post with write access
// router.post('/recipe', writeAccess, async (req, res) => {
//   try {
//     const db = req.app.get('db');
//     console.log(JSON.stringify(req.body, null, '\n'));
//     const insertion = await db.collection('recipes').insertOne(req.body);
//     if (insertion.acknowledged) {
//       const recipe = await db.collection('recipes')
//         .findOne({ _id: insertion.insertedId });

//       if (recipe) {
//         res.status(201).json(recipe);
//       } else {
//         res.status(404).send();
//       }
//     } else {
//       res.status(500).send();
//     }
//   } catch(err) {
//     console.error(err);
//     res.status(500).send();
//   }
// });


router.post('/recipe', writeAccess, async (req, res) => {
  try {
    const db = req.app.get('db');
    const user = res.locals.user; // kommt aus writeAccess

    const recipe = {
      title: req.body.title,
      ingredients: req.body.ingredients,
      description: req.body.description,
      instructions: req.body.instructions,
      category: req.body.category,

      authorId: user._id,
      authorName: `${user.first_name} ${user.last_name}`,

      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const insertion = await db.collection('recipes').insertOne(recipe);

    res.status(201).json({
      ...recipe,
      _id: insertion.insertedId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Recipe creation failed' });
  }
});


// // put with write access
// router.put('/recipe/:id', writeAccess, async (req, res) => {
//   try {
//     const db = req.app.get('db');
//     const updateData = { ...req.body };
//     delete updateData._id;

//     const updated = await db.collection('recipes')
//       .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updateData });

//     if (updated.modifiedCount === 1) {
//       const recipe = await db.collection('recipes').findOne({ _id: new ObjectId(req.params.id) });
//       res.json(recipe);
//     } else {
//       res.status(404).send();
//     }
//   } catch (err) {
//     res.status(500).send();
//   }
// });


router.put('/recipe/:id', writeAccess, async (req, res) => {
  try {
    const db = req.app.get('db');
    const user = res.locals.user;
    const recipeId = new ObjectId(req.params.id);

    const recipe = await db.collection('recipes').findOne({ _id: recipeId });
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    if (!recipe.authorId.equals(user._id)) {
      return res.status(403).json({ error: 'Nicht dein Rezept' });
    }

    const updateData = {
      title: req.body.title,
      ingredients: req.body.ingredients,
      description: req.body.description,
      instructions: req.body.instructions,
      category: req.body.category,
      updatedAt: new Date(),
    };

    await db.collection('recipes').updateOne(
      { _id: recipeId },
      { $set: updateData },
    );

    res.json({ ...recipe, ...updateData });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});


// delete with write access
router.delete('/recipe/:id', writeAccess, async (req, res) => {
  try {
    const db = req.app.get('db');
    const result = await db.collection('recipes').deleteOne({ _id: new ObjectId(req.params.id) });
    result.deletedCount === 1 ? res.status(204).send() : res.status(404).send();
  } catch (err) {
    res.status(500).send();
  }
});

export default router;