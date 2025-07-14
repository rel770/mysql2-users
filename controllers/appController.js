// Health check controller
export const healthCheck = (req, res) => {
  res.json({
    status: "OK",
    message: "MySQL Users API is running",
    timestamp: new Date().toISOString(),
  });
};

// API info controller
export const getApiInfo = (req, res) => {
  res.json({
    endpoints: {
      health: "GET /",
      info: "GET /info",
      users: {
        getAll: "GET /users",
        getById: "GET /users/:id",
        create: "POST /users",
        update: "PUT /users/:id",
        delete: "DELETE /users/:id",
      },
    },
  });
};
