import express from 'express';
import usersRouter from './routes/users.js';
import recipesRouter from './routes/recipes.js';
import { ObjectId } from 'mongodb';

const router = express.Router();


router.use('/', usersRouter);
router.use('/', recipesRouter);


/**
 * Middleware: Prüft, ob der User eingeloggt ist und in seinem 
 * Profil (Collection 'user') das Flag { permissions: { write: true } } hat.
 */
// export async function writeAccess(req, res, next) {
//   const db = req.app.get('db');
  
//   // Die ID des Profils über auth-Objekt des Tokens
//   const profileId = res.locals?.oauth?.token?.user?.user_id;

//   if (!profileId) {
//     return res.status(401).json({ error: 'Nicht angemeldet' });
//   }

//   try {
//     const userProfile = await db.collection('user').findOne({ _id: new ObjectId(profileId) });

//     if (userProfile?.permissions?.write) {
//       res.locals.user = userProfile; // Profil für die Route zwischenspeichern
//       next();
//     } else {
//       res.status(403).json({ error: 'Keine Schreibrechte' });
//     }
//   } catch (err) {
//     res.status(500).json({ error: 'Fehler bei der Rechteprüfung' });
//   }
// }

// export async function writeAccess(req, res, next) {
//   const db = req.app.get('db');
//   const token = res.locals?.oauth?.token;
//   if (!token?.user_id) return res.status(401).json({ error: 'Nicht angemeldet' });

//   const user = await db.collection('user').findOne({ _id: new ObjectId(token.user_id) });
//   if (!user) return res.status(401).json({ error: 'Nicht angemeldet' });
//   if (!user.permissions?.write) return res.status(403).json({ error: 'Keine Schreibrechte' });

//   res.locals.user = user; // store for later use
//   next();
// }

export async function writeAccess(req, res, next) {
  const db = req.app.get('db');

  // Token aus Header lesen
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Nicht angemeldet" });
  }

  const accessToken = authHeader.split(" ")[1];

  // Token in DB suchen
  const tokenDoc = await db.collection("token").findOne({ accessToken });
  if (!tokenDoc) {
    return res.status(401).json({ error: "Token ungültig oder abgelaufen" });
  }

  // User-Profil laden (Achtung: user_id, nicht user._id)
  const user = await db.collection("user").findOne({ _id: tokenDoc.user_id });
  if (!user) {
    return res.status(401).json({ error: "User nicht gefunden" });
  }

  // Schreibrechte prüfen
  if (!user.permissions?.write) {
    return res.status(403).json({ error: "Keine Schreibrechte" });
  }

  res.locals.user = user;
  next();
}

// example protected route
router.post('/todo', writeAccess, async (req, res) => {
  try {
    const db = req.app.get('db');
    const insertion = await db.collection('todo').insertOne({
      ...req.body,
      creator_id: res.locals.user._id,
    });
    const todo = await db.collection('todo').findOne({ _id: insertion.insertedId });
    res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

export default router;

