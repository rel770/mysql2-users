import { createPool } from "mysql2/promise";
import { config } from "dotenv";
import dbConfig from "../config/database.js";

config();

// Create database if not exists
export const ensureDatabase = async () => {
  const tempPool = createPool({
    ...dbConfig,
    connectionLimit: 1,
    queueLimit: 0,
  });
  const dbName = dbConfig.database;
  let connection;
  try {
    connection = await tempPool.getConnection();
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
  } catch (error) {
    console.error("Error ensuring database exists:", error);
    throw error;
  } finally {
    if (connection) connection.release();
    await tempPool.end();
  }
};

// connection pool configuration
const pool = createPool(dbConfig);

// Test connection to the db
export const testConnection = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log("Connected to MySQL database successfully!");
    connection.release();
    return true;
  } catch (error) {
    console.error("Error connecting to MySQL database:", error);
    if (connection) connection.release();
    return false;
  }
};

export default pool;
