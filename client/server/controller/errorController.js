const AppError = require('./../utils/appError');

// Handle invalid MongoDB ObjectId (CastError)
const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

// Handle duplicate fields (MongoDB code 11000)
const handleDuplicateFieldsDB = err => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  const message = `Duplicate field: "${field}" with value "${value}". Please use another value.`;
  return new AppError(message, 400);
};

// Handle Mongoose validation errors
const handleValidationErrorDB = err => {
  const messages = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${messages.join('. ')}`;
  return new AppError(message, 400);
};

// Dev mode: send full error
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack
  });
};

// Prod mode: hide internal error details
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    // Log for developers
    console.error('💥 UNEXPECTED ERROR:', err);

    // Generic message for client
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong'
    });
  }
};

module.exports = (err, req, res, next) => {
  // Set default values
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Dev environment
  if (process.env.NODE_ENV === 'development') {
    return sendErrorDev(err, res);
  }

  // Prod environment
  if (process.env.NODE_ENV === 'production') {
    let error = Object.create(err);
    error.message = err.message;
    error.name = err.name;
    error.code = err.code;

    // Handle specific known errors
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

    return sendErrorProd(error, res);
  }
};
