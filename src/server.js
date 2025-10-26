import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 2727;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Started on port ${PORT}!`);
});