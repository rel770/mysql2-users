import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    endpoints: [
      { method: "GET", path: "/", description: "Welcome message" },
      { method: "GET", path: "/users", description: "Get all users" },
      { method: "GET", path: "/users/:id", description: "Get user by ID" },
      { method: "POST", path: "/users", description: "Create new user" },
      { method: "PUT", path: "/users/:id", description: "Update user" },
      { method: "DELETE", path: "/users/:id", description: "Delete user" }
    ]
  });
});

export default router;
