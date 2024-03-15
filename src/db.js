import conn from './conn.js'

export async function createPost(title, description, banner, author, publishDate, tags) {
  const [result] = await conn.query('INSERT INTO blog_photo (title, description, banner, author, publishDate, tags) VALUES ( ?, ?, ?, ?, ?, ?)', [title, description, banner, author, publishDate, tags])
  return result
}
export async function getPostById(postId) {
  try {
    const [rows] = await conn.query('SELECT * FROM blog_photo WHERE id = ?', [postId])
    return rows[0]
  } catch (error) {
    console.error('Error fetching post by ID:', error)
    throw error
  }
}
// Obtener todos los posts
export async function getAllPosts() {
  try {
    const [rows] = await conn.query('SELECT * FROM blog_photo')
    return rows
  } catch (error) {
    console.error('Error fetching all posts:', error)
    throw error
  }
}
// Actualizar un post por ID
export async function updatePost(postId, title, description, banner, author, publishDate, tags) {
  try {
    const [result] = await conn.query(
      'UPDATE blog_photo SET title = ?, description = ?, banner = ?, author = ?, publishDate = ?, tags = ? WHERE id = ?',
      [title, description, banner, author, publishDate, tags, postId],
    )
    return result
  } catch (error) {
    console.error('Error updating post:', error)
    throw error
  }
}
// Eliminar un post por ID
export async function deletePostById(postId) {
  try {
    const [result] = await conn.query('DELETE FROM blog_photo WHERE id = ?', [postId])
    return result
  } catch (error) {
    console.error('Error al eliminar el post:', error)
    throw error
  }
}
