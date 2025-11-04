import express from 'express';
import api from "./backend_src/api.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';
import 'dotenv/config';


const app = express();
const port = 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);

app.use(express.json());

// backend routes
app.use('/api', api);


app.use(express.static('dist'));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

try {
  const client = new MongoClient(connectionString);
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

