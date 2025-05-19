import CustomError from '../errors/CustomError.js';

// Middleware to handle errors
// Disable the eslint rule for the next line
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    error: 'Error interno del servidor',
  });
};

export default errorHandler;
