import express from 'express';
import api from './backend_src/api.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';
import OAuthServer from 'express-oauth-server';
import register from './backend_src/routes/register.js';
import oAuthModel from './backend_src/middleware/oAuthModel.js';
import 'dotenv/config';
import cors from "cors";


const app = express();
const port = 3000;


// global middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// app.use(express.json());
// app.use(express.urlencoded({ extended: false })); // in OAuth2 standard, credentials are sent as "application/x-www-form-urlencoded", this middleware allows parsing it
app.use(express.json({ limit: '10mb' })); // Erlaubt größere JSON-Pakete (Bilder)
app.use(express.urlencoded({ limit: '10mb', extended: false }));

try {
  // Datenbank-Verbindung
  const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);
  await client.connect();
  const db = client.db('demo');
  
  app.set('db', db);

  // Indizes für automatische Löschung abgelaufener Tokens
  db.collection('token').createIndex({ accessTokenExpiresAt: 1 }, { expireAfterSeconds: 0 });
  db.collection('token').createIndex({ refreshTokenExpiresAt: 1 }, { expireAfterSeconds: 0 });
  db.collection('token').createIndex({ emailTokenExpiresAt: 1 }, { expireAfterSeconds: 0 });



  const oauth = new OAuthServer({ model: oAuthModel(db) }); // create oauth middleware



// ===========================================
//          ROUTEN UND STATIC FILES
// ===========================================



// login
  // app.use('/api/token', oauth.token({ requireClientAuthentication: { password: false, refresh_token: false } })); // use oauth token middleware
  // app.use('/api/register', register); // handle user registration
  // app.use('/api', oauth.authenticate(), api); // use oauth authentication middleware on any resource that should be protected
  // app.use('/api', api); //sieht man immer
  // app.use('/api', oauth.authenticate({ passthrough: true }), api);

app.oauth = oauth; // wichtig für Router-Zugriff

app.use('/api/token', oauth.token({ requireClientAuthentication: { password: false, refresh_token: false } }));
app.use('/api/register', register);
//app.use('/api', oauth.authenticate(), api); // protects /api routes
app.use('/api', api); // öffentlich




// ===========================================
//       SERVER START UND DB-VERBINDUNG
// ===========================================


  // Server Start
  app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
    console.log(`MongoDB verbunden: ${db.databaseName}`);
  });

} catch (err) {
  console.error("Datenbank-Verbindungsfehler:", err);
}







