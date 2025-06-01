import { ErrorRequestHandler } from 'express';
import CustomError from '../errors/CustomError';

// Middleware de manejo de errores con la firma correcta
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      error: err.message,
    });
    return;
  }

  console.error(err); // Log para debug

  res.status(500).json({
    error: 'Error interno del servidor',
  });
};

export default errorHandler;
