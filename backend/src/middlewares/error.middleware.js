
export const notFound = (req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: err.message,
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID",
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      message: "This record already exists",
    });
  }

  console.error(err);

  return res.status(500).json({
    message: "Internal server error",
  });
};
