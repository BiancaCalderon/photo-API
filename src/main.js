import express from 'express'
import fs from 'fs'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import jwt from 'jsonwebtoken'
import {
  getPostById, createPost, getAllPosts, updatePost, deletePostById, login, verifyToken
} from './db.js'

const app = express()
app.use(express.json())

// Cargar la documentación de la API desde el archivo YAML
const swaggerDocument = YAML.load('./swagger/swagger.yml')

// Documentación de la API utilizando Swagger UI
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Middleware para registrar detalles de las solicitudes en log.txt
app.use((req, res, next) => {
  const { method, url, body } = req
  const timestamp = new Date().toISOString()
  const logMessage = `${timestamp} - ${method} ${url} - Payload: ${JSON.stringify(body)}\n`

  // Escribir el registro en log.txt
  fs.appendFile('log.txt', logMessage, (err) => {
    if (err) {
      console.error('Error al escribir en el archivo de registro:', err)
    }
  })

  // Continuar con el siguiente middleware
  next()
})

// Obtener todos los posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await getAllPosts()
    res.json(posts)
  } catch (error) {
    console.error('Error al obtener todos los posts:', error)
    res.status(500).json({ message: 'Error al obtener todos los posts' })
  }
})

// Crear un nuevo post
app.post('/posts', async (req, res) => {
  const {
    title, description, banner, author, tags,
  } = req.body
  try {
    const result = await createPost(title, description, banner, author, tags)
    res.status(201).json({ message: 'Post creado correctamente', postId: result.insertId })
  } catch (error) {
    console.error('Error al crear el post:', error)
    res.status(500).json({ message: 'Error al crear el post' })
  }
})

// Obtener un post por ID
app.get('/posts/:postId', async (req, res) => {
  const { postId } = req.params
  try {
    const post = await getPostById(postId)
    if (post) {
      res.json(post)
    } else {
      res.status(404).json({ message: 'Post no encontrado' })
    }
  } catch (error) {
    console.error('Error al obtener el post:', error)
    res.status(500).json({ message: 'Error al obtener el post' })
  }
})

// Actualizar un post por ID
app.put('/posts/:postId', async (req, res) => {
  const { postId } = req.params
  const {
    title, description, banner, author, tags,
  } = req.body
  try {
    const result = await updatePost(postId, title, description, banner, author, tags)
    if (result.affectedRows > 0) {
      res.json({ message: 'Post actualizado correctamente' })
    } else {
      res.status(404).json({ message: 'Post no encontrado' })
    }
  } catch (error) {
    console.error('Error al actualizar el post:', error)
    res.status(500).json({ message: 'Error al actualizar el post' })
  }
})

// Eliminar un post por ID
app.delete('/posts/:postId', async (req, res) => {
  const { postId } = req.params
  try {
    const result = await deletePostById(postId)
    if (result.affectedRows > 0) {
      res.json({ message: 'Post eliminado correctamente' })
    } else {
      res.status(404).json({ message: 'Post no encontrado' })
    }
  } catch (error) {
    console.error('Error al eliminar el post:', error)
    res.status(500).json({ message: 'Error al eliminar el post' })
  }
})

// Verificar el usuario y la contraseña
app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const loginResult = await login(username, password);
    if (loginResult.success) {
      const token = jwt.sign({ username }, 'token_photo_blog', { expiresIn: '1h' });      
      res.json({ success: true, message: 'Inicio de sesión exitoso', token });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

// Verificar el token
app.get('/admin/verify-token', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; 
  if (!token) {
    return res.status(401).json({ success: false, message: 'Token not provided' });
  }
  try {
    const isAuthenticated = await verifyToken(token);
    if (isAuthenticated) {
      return res.status(200).json({ success: true, message: 'User authenticated' });
    } else {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error verifying authentication:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.use((req, res) => {
  res.status(501).json({ message: 'Not Implemented' })
})

// Iniciando el servidor
const port = 22272
app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})

