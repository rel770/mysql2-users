import pool from "./connection.js";

// Add new user
export const createUser = async (name, email) => {
  const insertQuery = "INSERT INTO users (name, email) VALUES (?, ?)";

  try {
    const [result] = await pool.execute(insertQuery, [name, email]);
    console.log("User created with ID:", result.insertId);
    return result.insertId;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Get all users
export const getAllUsers = async () => {
  const selectQuery = "SELECT * FROM users ORDER BY created_at DESC";

  try {
    const [rows] = await pool.execute(selectQuery);
    return rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Get user by ID
export const getUserById = async (id) => {
  const selectQuery = "SELECT * FROM users WHERE id = ?";

  try {
    const [rows] = await pool.execute(selectQuery, [id]);
    return rows[0] || null;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

// Update user
export const updateUser = async (id, name, email) => {
  const updateQuery = "UPDATE users SET name = ?, email = ? WHERE id = ?";

  try {
    const [result] = await pool.execute(updateQuery, [name, email, id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Delete user
export const deleteUser = async (id) => {
  const deleteQuery = "DELETE FROM users WHERE id = ?";

  try {
    const [result] = await pool.execute(deleteQuery, [id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
