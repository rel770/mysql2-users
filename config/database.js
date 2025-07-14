// Database configuration
export default {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || "users",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};
