import express from 'express';
import api from './backend_src/api.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';
import OAuthServer from 'express-oauth-server';
import register from './backend_src/middleware/register.js';
import oAuthModel from './backend_src/middleware/oAuthModel.js';
import 'dotenv/config';


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // in OAuth2 standard, credentials are sent as "application/x-www-form-urlencoded", this middleware allows parsing it

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

try {
  const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);
  await client.connect();
  const db = client.db('demo');
  
  app.set('db', db);

  // we add TTL indexes to expiration fields to automatically remove expired entries
  db.collection('token').createIndex({ accessTokenExpiresAt: 1 }, { expireAfterSeconds: 0 });
  db.collection('token').createIndex({ refreshTokenExpiresAt: 1 }, { expireAfterSeconds: 0 });
  db.collection('token').createIndex({ emailTokenExpiresAt: 1 }, { expireAfterSeconds: 0 });


// ===========================================
//             GLOBALE MIDDLEWARE
// ===========================================


// app.use((req, res, next) => {
//   console.log(`[LOG] ${new Date().toISOString()} - ${req.method}: ${req.url}`); 
//   next();
// });

  const oauth = new OAuthServer({ model: oAuthModel(db) }); // create oauth middleware



// ===========================================
//          ROUTEN UND STATIC FILES
// ===========================================
// backend routes


// app.use('/api', api);
// app.use(express.static('dist'));
// app.use((req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

  app.use('/api/token', oauth.token({ requireClientAuthentication: { password: false, refresh_token: false } })); // use oauth token middleware
  app.use('/api/register', register); // handle user registration
  app.use('/api', oauth.authenticate(), api); // use oauth authentication middleware on any resource that should be protected


// ===========================================
//       SERVER START UND DB-VERBINDUNG
// ===========================================


// try {
//   await client.connect();
//   const db = client.db('demo');

//   app.set('db', db); // save a reference to the db to app config


//   // start server
//   app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
//   });
// } catch (err) {
//   console.error(err);
// }


  // start server
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
} catch (err) {
  console.error(err);
}

