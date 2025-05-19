import { BadRequestError, ConflictError } from '../../errors/index.js';

export const missingFieldsError = (fields = []) => {
  const message = fields.length > 0
    ? `Faltan los siguientes campos requeridos: ${fields.join(', ')}`
    : 'Faltan campos requeridos en el cuerpo de la solicitud';
  return new BadRequestError(message);
};

export const userAlreadyRegisteredError = (message) => new ConflictError(message || 'El usuario ya está registrado');
