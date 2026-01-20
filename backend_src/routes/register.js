import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

const router = express.Router();

// SCHRITT 1: E-Mail reservieren und Token generieren
router.post('/', async (req, res) => {
  try {
    const db = req.app.get('db');
    const { email } = req.body;

    // Prüfen, ob Email schon existiert
    const existing = await db.collection('user_auth').findOne({ username: email });
    if (existing) {
      // Wir senden 201, um keine Infos über existierende Konten preiszugeben
      return res.status(201).send();
    }

    // 1. Eintrag in user_auth erstellen (noch ohne Passwort und Profil-Link)
    const authInsertion = await db.collection('user_auth').insertOne({ 
      username: email, 
      password: null, 
      user_id: null,
    });

    if (authInsertion.acknowledged) {
      const token = uuidv4();
      // 2. Token speichern und mit der auth_id verknüpfen
      await db.collection('token').insertOne({
        emailToken: token,
        emailTokenExpiresAt: new Date(Date.now() + (1000 * 60 * 60)),
        auth_id: authInsertion.insertedId, // Referenz auf user_auth
      });

      console.log(`Activation link: http://localhost:5173/activate/${token}`); // Port 5173 ist Standard für Vite/React
      res.status(201).send();
    }
  } catch(err) {
    console.error(err);
    res.status(500).send();
  }
});

// SCHRITT 2: Profil vervollständigen (wird von der Aktivierungsseite aufgerufen)
router.put('/:token', async (req, res) => {
  try {
    const db = req.app.get('db');
    const { first_name, last_name, password } = req.body;

    // 1. Token validieren
    const tokenDoc = await db.collection('token').findOne({ emailToken: req.params.token });
    if (!tokenDoc || tokenDoc.emailTokenExpiresAt < new Date()) {
      return res.status(401).json({ error: 'Token ungültig oder abgelaufen' });
    }

    // 2. Profil in 'user' Tabelle erstellen
    const profileInsertion = await db.collection('user').insertOne({
      first_name,
      last_name,
      permissions: { write: true }, // Oder false, je nach Standard
    });

    if (profileInsertion.acknowledged) {
      // 3. user_auth aktualisieren (Passwort setzen + Link zum neuen Profil)
      const hashedPassword = await bcrypt.hash(password, 10);
      const updated = await db.collection('user_auth').updateOne(
        { _id: tokenDoc.auth_id }, 
        { $set: {
          password: hashedPassword,
          user_id: profileInsertion.insertedId, // Brücke zur user Tabelle
        }, 
        },
      );

      if (updated.modifiedCount === 1) {
        // 4. Token löschen
        await db.collection('token').deleteOne({ _id: tokenDoc._id });
        res.status(200).json({ message: 'Account erfolgreich aktiviert' });
      } else {
        res.status(500).send();
      }
    }
  } catch(err) {
    console.error(err);
    res.status(500).send();
  }
});

export default router;