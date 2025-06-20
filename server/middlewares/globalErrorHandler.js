import AppError from "../utils/AppError.js";
const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  let error = { ...err };
  error.message = message;

  if (err.name === "CastError") {
    error = new AppError(`Invalid ${err.path}: ${err.value}.`, 400);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    const message = value
      ? `Duplicate value '${value}' found for field '${field}'. Please use a different value.`
      : `Duplicate value found for field '${field}'. Please provide a valid value.`;

    error = new AppError(message, 400);
  }

  res.status(error.statusCode || statusCode).json({
    success: false,
    message: error.message || message,
    error,
  });
};
export default globalErrorHandler;
