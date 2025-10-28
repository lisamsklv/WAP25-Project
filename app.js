import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));


// route definitions

app.use(express.json());

app.get('/api', (req, res) => {
    res.json({
        success: true,
    });
});

app.use(express.static('dist'));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

// start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

