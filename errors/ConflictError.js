import CustomError from './CustomError.js';

class ConflictError extends CustomError {
  constructor(message = 'Conflicto: recurso duplicado') {
    super(message, 409);
  }
}

export default ConflictError;
