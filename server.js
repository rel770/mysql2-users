import { config } from "dotenv";
import express from "express";
import { testConnection, ensureDatabase } from "./db/connection.js";
import { createUsersTable } from "./db/queries.js";
import { notFound, errorHandler, requestLogger } from "./middleware/index.js";
import usersRouter from "./routes/users.js";
import indexRouter from "./routes/index.js";

config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(requestLogger);

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

// 404 handler - must be after all routes  
app.use(notFound);

// Global error handler - must be last
app.use(errorHandler);

// Start server after DB creation, connection and table creation
const startServer = async () => {
  try {
    await ensureDatabase();
    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.error("Failed to connect to database. Server will not start.");
      process.exit(1);
    }
    await createUsersTable();
    app.listen(port, () => {
      console.log(`Server running at http://${process.env.HOST}:${port}/`);
      console.log("Available endpoints:");
      console.log("   GET    / - Health check");
      console.log("   GET    /info - API information");
      console.log("   GET    /users - Get all users");
      console.log("   GET    /users/:id - Get user by ID");
      console.log("   POST   /users - Create new user");
      console.log("   PUT    /users/:id - Update user");
      console.log("   DELETE /users/:id - Delete user");
      console.log("Database connection established");
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();
