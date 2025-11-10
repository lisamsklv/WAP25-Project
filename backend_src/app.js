import express from 'express';
import api from "./api.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';
import 'dotenv/config';


const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);


// ===========================================
//             GLOBALE MIDDLEWARE
// ===========================================


app.use(express.json());

app.use((req, res, next) => {
  console.log(`[LOG] ${new Date().toISOString()} - ${req.method}: ${req.url}`); 
  next();
});


// ===========================================
//          ROUTEN UND STATIC FILES
// ===========================================


// backend routes
app.use('/api', api);

app.use(express.static('dist'));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


// ===========================================
//       SERVER START UND DB-VERBINDUNG
// ===========================================


try {
  await client.connect();
  const db = client.db('demo');

  app.set('db', db); // save a reference to the db to app config

  // start server
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
} catch (err) {
  console.error(err);
}

