import { createPool } from "mysql2/promise";
import { config } from "dotenv";

config();

// connection pool configuration
const pool = createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "users",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
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
