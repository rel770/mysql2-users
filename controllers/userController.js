import { getAllUsers, createUser, getUserById, updateUser, deleteUser } from "../db/queries.js";

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error in getUsers:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get user by ID
export const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error in getUser:", error);
    res.status(500).json({ error: error.message });
  }
};

// Create new user
export const createNewUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    const userId = await createUser(name, email);
    res.status(201).json({ 
      id: userId, 
      message: "User created successfully",
      user: { id: userId, name, email }
    });
  } catch (error) {
    console.error("Error in createNewUser:", error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: "Email already exists" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Update user
export const updateExistingUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    const updated = await updateUser(req.params.id, name, email);
    if (!updated) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ 
      message: "User updated successfully",
      user: { id: req.params.id, name, email }
    });
  } catch (error) {
    console.error("Error in updateExistingUser:", error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: "Email already exists" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Delete user
export const deleteExistingUser = async (req, res) => {
  try {
    const deleted = await deleteUser(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ 
      message: "User deleted successfully",
      id: req.params.id
    });
  } catch (error) {
    console.error("Error in deleteExistingUser:", error);
    res.status(500).json({ error: error.message });
  }
};
