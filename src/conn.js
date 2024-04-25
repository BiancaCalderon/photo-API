import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'blog_bianca',
  password: 'zipfest_123',
  database: 'blog_bianca',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export default pool
