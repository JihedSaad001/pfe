export const errorHandler = (err, req, res, next) => {
  console.error(err.stack)

  // Check if it's a Sequelize validation error
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      message: "Validation error",
      errors: err.errors.map((e) => ({ field: e.path, message: e.message })),
    })
  }

  // Check if it's a Sequelize unique constraint error
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      message: "Unique constraint error",
      errors: err.errors.map((e) => ({ field: e.path, message: e.message })),
    })
  }

  // Default error response
  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  })
}
