import CustomError from './CustomError';

class BadRequestError extends CustomError {
  constructor(message: string = 'Solicitud invalida') {
    super(message, 400);
  }
}

export default BadRequestError;
