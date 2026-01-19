import express from 'express';
import usersRouter from './routes/users.js';
import recipesRouter from './routes/recipes.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

/**
 * Middleware: Prüft, ob der User eingeloggt ist und in seinem 
 * Profil (Collection 'user') das Flag { permissions: { write: true } } hat.
 */
export async function writeAccess(req, res, next) {
  const db = req.app.get('db');
  
  // Die ID des Profils über auth-Objekt des Tokens
  const profileId = res.locals?.oauth?.token?.user?.user_id;

  if (!profileId) {
    return res.status(401).json({ error: 'Nicht angemeldet' });
  }

  try {
    const userProfile = await db.collection('user').findOne({ _id: new ObjectId(profileId) });

    if (userProfile?.permissions?.write) {
      res.locals.user = userProfile; // Profil für die Route zwischenspeichern
      next();
    } else {
      res.status(403).json({ error: 'Keine Schreibrechte' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Fehler bei der Rechteprüfung' });
  }
}

router.use('/', usersRouter);
router.use('/', recipesRouter);

export default router;