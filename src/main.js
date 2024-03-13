import express from 'express';
import {getPostById, createPost, getAllPosts, updatePost, deletePostById} from './db.js';

const app = express();
app.use(express.json());


// Obtener todos los posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.json(posts);
    } catch (error) {
        console.error('Error al obtener todos los posts:', error);
        res.status(500).json({ message: 'Error al obtener todos los posts' });
    }
});

// Crear un nuevo post
app.post('/posts', async (req, res) => {
    const {title, description, banner, author, publish_date, tags } = req.body;
    try {
        const result = await createPost(title, description, banner, author, publish_date, tags);
        res.status(201).json({ message: 'Post creado correctamente', postId: result.insertId });
    } catch (error) {
        console.error('Error al crear el post:', error);
        res.status(500).json({ message: 'Error al crear el post' });
    }
});

// Obtener un post por ID
app.get('/posts/:postId', async (req, res) => {
    const postId = req.params.postId;
    try {
        const post = await getPostById(postId);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: 'Post no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el post:', error);
        res.status(500).json({ message: 'Error al obtener el post' });
    }
});

// Actualizar un post por ID
app.put('/posts/:postId', async (req, res) => {
    const postId = req.params.postId;
    const { title, description, banner, author, publish_date, tags } = req.body;
    try {
        const result = await updatePost(postId, title, description, banner, author, publish_date, tags);
        if (result.affectedRows > 0) {
            res.json({ message: 'Post actualizado correctamente' });
        } else {
            res.status(404).json({ message: 'Post no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar el post:', error);
        res.status(500).json({ message: 'Error al actualizar el post' });
    }
});

// Eliminar un post por ID
app.delete('/posts/:postId', async (req, res) => {
    const postId = req.params.postId;
    try {
        const result = await deletePostById(postId);
        if (result.affectedRows > 0) {
            res.json({ message: 'Post eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Post no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar el post:', error);
        res.status(500).json({ message: 'Error al eliminar el post' });
    }
});



// Iniciando el servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`);
});
