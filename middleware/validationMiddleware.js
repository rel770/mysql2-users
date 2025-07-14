// Validation middleware for user data
export const validateUserData = (req, res, next) => {
  const { name, email } = req.body;

  // Check if required fields exist
  if (!name || !email) {
    return res.status(400).json({
      error: "Validation Error",
      message: "Name and email are required",
      timestamp: new Date().toISOString(),
    });
  }

  // Validate name
  if (typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({
      error: "Validation Error",
      message: "Name must be at least 2 characters long",
      timestamp: new Date().toISOString(),
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: "Validation Error",
      message: "Please provide a valid email address",
      timestamp: new Date().toISOString(),
    });
  }

  // Trim data
  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();

  next();
};

// Validation middleware for user ID parameter
export const validateUserId = (req, res, next) => {
  const { id } = req.params;

  // Check if an ID was provided, and it is a valid number
  if (!id || isNaN(parseInt(id)) || parseInt(id) <= 0) {
    return res.status(400).json({
      error: "Validation Error",
      message: "Invalid user ID. Must be a positive number",
      timestamp: new Date().toISOString(),
    });
  }

  // Convert to integer
  req.params.id = parseInt(id);
  next();
};
