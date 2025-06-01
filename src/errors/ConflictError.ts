import CustomError from './CustomError';

class ConflictError extends CustomError {
  constructor(message: string = 'Conflicto: recurso duplicado') {
    super(message, 409);
  }
}

export default ConflictError;
