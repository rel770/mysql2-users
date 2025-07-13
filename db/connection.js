import { createPool } from "mysql2/promise";
import { config } from "dotenv";

config();

const baseConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
};

// Create database if not exists
export const ensureDatabase = async () => {
  const tempPool = createPool({
    ...baseConfig,
    connectionLimit: 1,
    queueLimit: 0,
  });
  const dbName = process.env.DB_NAME || "users";
  try {
    const connection = await tempPool.getConnection();
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    connection.release();
  } catch (error) {
    console.error("Error ensuring database exists:", error);
    throw error;
  } finally {
    await tempPool.end();
  }
};

// connection pool configuration
const pool = createPool({
  ...baseConfig,
  database: process.env.DB_NAME || "users",
  connectionLimit: 10,
  queueLimit: 0,
});

// Test connection to the db
export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL database successfully!");
    connection.release();
    return true;
  } catch (error) {
    console.error("Error connecting to MySQL database:", error);
    return false;
  }
};

export default pool;
