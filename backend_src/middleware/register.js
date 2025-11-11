import express from 'express';
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';

// TODO: aktivierungsseite für account soll umgesetzt werden über Konsole und frontend mapping auf konsole

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const db = req.app.get('db');
    // TODO: validate req.body (email)
    //(if email is in use, just send a 201 ok and dont send, so he doesnt know that there is already the mail registered)

    const insertion = await db.collection('user_auth').insertOne({ username: req.body.email });
    if (insertion.acknowledged) {
      const token = v4();
      const tokenInsertion = await db.collection('token').insertOne({
        emailToken: token,
        emailTokenExpiresAt: new Date(Date.now() + (1000 * 60 * 60)), // now plus 60 minutes
        user_id: insertion.insertedId,
      });

      if (tokenInsertion.acknowledged) {
        // TODO: send url with token by email instead of logging it to console
        console.log(`Activation link: http://localhost:3000/activate/${token}`);

        res.status(201).send();
      } else {
        res.status(500).send();
      }
    } else {
      res.status(500).send();
    }
  } catch(err) {
    console.error(err);
    res.status(500).send();
  }
});



router.put('/:token', async (req, res) => {
  try {
    const db = req.app.get('db');
    // TODO: validate req.body (first_name, last_name, password)

    const token = await db.collection('token').findOne({ emailToken: req.params.token });
    if (token) {
      const insertion = await db.collection('user').insertOne({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        permissions: { write: false },
      });

      if (insertion.acknowledged) {
        const updated = await db.collection('user_auth').updateOne({ _id: token.user_id }, { $set: {
          password: await bcrypt.hash(req.body.password, 10),
          user_id: insertion.insertedId
        } });
        if (updated.modifiedCount === 1) {
          await db.collection('token').deleteOne({ emailToken: req.params.token });
          
          res.status(200).send();
        } else {
          res.status(500).send();
        }
      } else {
        res.status(500).send();
      }
    } else {
      res.status(401).send();
    }
  } catch(err) {
    console.error(err);
    res.status(500).send();
  }
});

export default router;
