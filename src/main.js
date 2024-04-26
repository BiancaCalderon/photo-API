import express from 'express'
import fs from 'fs'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import {
  getPostById, createPost, getAllPosts, updatePost, deletePostById, verifyUser, verifyToken
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
app.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const isValidUser = await verifyUser(username, password)
    if (isValidUser) {
      const token = 'aquí_generar_token'; // Generar el token JWT aquí
      res.json({ message: 'Inicio de sesión exitoso', token })
    } else {
      res.status(401).json({ message: 'Credenciales incorrectas' })
    }
  } catch (error) {
    console.error('Error al verificar usuario:', error)
    res.status(500).json({ message: 'Error al verificar usuario' })
  }
})

// Verificar el token
app.post('/verify-token', async (req, res) => {
  const { token } = req.body
  try {
    const isValidToken = await verifyToken(token)
    if (isValidToken) {
      res.json({ valid: true })
    } else {
      res.status(401).json({ valid: false })
    }
  } catch (error) {
    console.error('Error al verificar el token:', error)
    res.status(500).json({ message: 'Error al verificar el token' })
  }
})

// Iniciando el servidor
const port = 22272
app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})
