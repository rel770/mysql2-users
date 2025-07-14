import express from "express";
import { 
  getUsers, 
  getUser, 
  createNewUser, 
  updateExistingUser, 
  deleteExistingUser 
} from "../controllers/userController.js";
import { validateUserData, validateUserId } from "../middleware/validationMiddleware.js";

const router = express.Router();

// GET /users - Get all users
router.get("/", getUsers);

// GET /users/:id - Get user by ID
router.get("/:id", validateUserId, getUser);

// POST /users - Create new user
router.post("/", validateUserData, createNewUser);

// PUT /users/:id - Update user
router.put("/:id", validateUserId, validateUserData, updateExistingUser);

// DELETE /users/:id - Delete user
router.delete("/:id", validateUserId, deleteExistingUser);

export default router;
