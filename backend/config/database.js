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

// Testar conexão
pool.getConnection()
  .then(connection => {
    console.log('MySQL connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('MySQL connection error:', err);
  });

export default pool;
