export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------
//IMPORTANTE: los errores de validacion se manejan en schemaValidation.ts para obtener mejores mensajes de error segun la validacion fallida gracias a zod
//--------------------------------------------------------------------------------------------------------------------------------------------------------

export function handleErrorParam(error: any, next: Function) {  //esta funcion ahorra repetir codigo en controllers
  if (error instanceof AppError) {
    return next(error);
  }
  return next(new InternalServerError());
}

export class NotFoundError extends AppError {
  constructor(message = "Recurso no encontrado") {
    super(message, 404);
  }
}

export class NotImplementedError extends AppError {
  constructor(message = "Funcionalidad no implementada") {
    super(message, 501);
  }
}

export class InternalServerError extends AppError {
  constructor(message = "Error interno del servidor") {
    super(message, 500);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Solicitud incorrecta") {
    super(message, 400);
  }
}
