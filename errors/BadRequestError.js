import CustomError from './CustomError.js';

class BadRequestError extends CustomError {
  constructor(message = 'Solicitud invalida') {
    super(message, 400);
  }
}

export default BadRequestError;
