import { BadRequestError, ConflictError } from '../../errors/index';

export const missingFieldsError = (fields: string[] = []): BadRequestError => {
  const message = fields.length > 0
    ? `Faltan los siguientes campos requeridos: ${fields.join(', ')}`
    : 'Faltan campos requeridos en el cuerpo de la solicitud';

  return new BadRequestError(message);
};

export const userAlreadyRegisteredError = (message = 'El usuario ya está registrado'): ConflictError => 
  new ConflictError(message);
