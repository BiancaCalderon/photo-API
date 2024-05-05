import conn from './conn.js'
import jwt from 'jsonwebtoken'

// Función para crear un nuevo post
export async function createPost(title, description, banner, author, tags) {
  try {
    const [result] = await conn.query(
      'INSERT INTO blog_photo (title, description, banner, author, tags) VALUES (?, ?, ?, ?, ?)',
      [title, description, banner, author, tags]
    );
    return result;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

// Función para obtener un post por su ID
export async function getPostById(postId) {
  try {
    const [rows] = await conn.query('SELECT * FROM blog_photo WHERE id = ?', [postId]);
    return rows[0];
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    throw error;
  }
}

// Función para obtener todos los posts
export async function getAllPosts() {
  try {
    const [rows] = await conn.query('SELECT * FROM blog_photo');
    return rows;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    throw error;
  }
}

// Función para actualizar un post por su ID
export async function updatePost(postId, title, description, banner, author, tags) {
  try {
    const [result] = await conn.query(
      'UPDATE blog_photo SET title = ?, description = ?, banner = ?, author = ?, tags = ? WHERE id = ?',
      [title, description, banner, author, tags, postId]
    );
    return result;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}

// Función para eliminar un post por su ID
export async function deletePostById(postId) {
  try {
    const [result] = await conn.query('DELETE FROM blog_photo WHERE id = ?', [postId]);
    return result;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}

// Función para verificar el usuario y la contraseña
export async function login(username, password) {
  try {
    console.log("Username recibido:", username);
    console.log("Password recibido:", password);
    
    const [rows] = await conn.query('SELECT * FROM administradores WHERE username = ?', [username]);
    console.log("Filas devueltas por la consulta SQL:", rows);

    if (rows.length === 0) {
      return { success: false, message: 'Usuario incorrecto' };
    }
    const user = rows[0];
    if (user.password !== password) {
      return { success: false, message: 'Contraseña incorrecta' };
    }
    return { success: true };
  } catch (error) {
    console.error('Error verifying user:', error);
    throw error;
  }
}

// Función para verificar el token
export async function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, 'token_photo_blog');
    return decoded;
  } catch (error) {
    throw error;
  }
}

