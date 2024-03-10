import express from 'express';
import {getAllPosts} from './db.js';

const app = express();
app.use(express.json());

// Obtener todos los posts
app.get('/posts', async (req, res) => {
    const posts = await getAllPosts();
    res.json(posts);
});

// Iniciando el servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`);
});
