import conn from './conn.js'

export async function getAllPosts() {
 const [rows] = await conn.query('SELECT * FROM blog_photo')
 return rows
}

export async function createPost(id, title, description, banner, author, publish_date, tags) {
    const [result] = await conn.query('INSERT INTO blog_photo (id, title, description, banner, author, publish_date, tags) VALUES (?, ?, ?, ?, ?, ?,?)', [id, title, description, banner, author, publish_date, tags])
    return result
 }
