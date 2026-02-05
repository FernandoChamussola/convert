import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'converter',
  password: process.env.DB_PASSWORD || 'converter123',
  database: process.env.DB_NAME || 'converter_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Inicializar base de dados e criar tabelas se não existirem
async function initDatabase() {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL connected successfully');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        google_id VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        picture VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        session_id VARCHAR(128) PRIMARY KEY,
        expires INT UNSIGNED NOT NULL,
        data MEDIUMTEXT
      )
    `);

    console.log('Database tables verified');
    connection.release();
  } catch (err) {
    console.error('MySQL initialization error:', err);
  }
}

initDatabase();

export default pool;
