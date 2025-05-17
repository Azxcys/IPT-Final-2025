import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || '153.92.15.31',
  user: process.env.DB_USER || 'u875409848_hmagsayo',
  password: process.env.DB_PASSWORD || '9T2Z5$3UKkgSYzE',
  database: process.env.DB_NAME || 'u875409848_hmagsayo',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool; 