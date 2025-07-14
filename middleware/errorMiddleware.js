// 404 Not Found middleware
export const notFound = (req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.originalUrl} not found`,
    timestamp: new Date().toISOString()
  });
};

// Global error handler middleware
export const errorHandler = (err, req, res, next) => {
  console.error("Global error handler:", err);
  
  res.status(err.status || 500).json({
    error: err.name || "Internal Server Error",
    message: err.message || "Something went wrong",
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
