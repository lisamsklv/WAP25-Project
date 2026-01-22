import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

const router = express.Router();

// SCHRITT 1: E-Mail registrieren & Token senden
router.post('/', async (req, res) => {
  try {
    const db = req.app.get('db');
    // Erstelle einen vorläufigen Eintrag in user_auth
    const insertion = await db.collection('user_auth').insertOne({ 
      username: req.body.email, 
    });
    
    if (!insertion.acknowledged) return res.status(500).send();

    const token = uuidv4();
    const tokenInsertion = await db.collection('token').insertOne({
      emailToken: token,
      emailTokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60), // 1 Stunde gültig
      user_id: insertion.insertedId, // Verweis auf den user_auth Eintrag
    });

    if (!tokenInsertion.acknowledged) return res.status(500).send();

    // In der Konsole ausgeben (da wir keinen Mail-Server haben)
    console.log(`Aktivierungs-Link: http://localhost:5173/activate/${token}`);

    // Token ans Frontend zurückgeben, damit die RegistrationPage weiterleiten kann
    res.status(201).json({ token: token });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// SCHRITT 2: Account aktivieren (Passwort & Profil setzen)
router.put('/:token', async (req, res) => {
  try {
    const db = req.app.get('db');
    const { first_name, last_name, password } = req.body;
    const { token } = req.params;

    // 1. Token suchen
    const tokenDoc = await db.collection('token').findOne({ emailToken: token });
    if (!tokenDoc) {
      return res.status(401).json({ error: 'Link ungültig oder abgelaufen' });
    }

    // 2. Passwort hashen
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. User-Profil in der 'user' Collection anlegen
    const profileResult = await db.collection('user').insertOne({
      first_name,
      last_name,
      permissions: { write: true }, // Standardmäßig Schreibrechte geben
    });

    // 4. Den 'user_auth' Eintrag vervollständigen
    await db.collection('user_auth').updateOne(
      { _id: tokenDoc.user_id },
      { 
        $set: { 
          password: hashedPassword,
          user_id: profileResult.insertedId, // Brücke zum Profil schlagen
        }, 
      },
    );

    // 5. Token löschen
    await db.collection('token').deleteOne({ _id: tokenDoc._id });

    res.status(200).json({ message: 'Account erfolgreich aktiviert!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
});

export default router;