export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  //TODO - integrate with RabbitMQ and Drivestriker
  // Reads:
  // 1 https://stackoverflow.com/questions/7310521/node-js-best-practice-exception-handling 
  // 2 https://www.tritondatacenter.com/node-js/production/design/errors

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
} 

export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string) {
    super(message, 500);
  }
} 

/*
Não entendo muito bem sobre tratamento de erros, leituras recomendadas:

js Error Handling Best Practices (Google)
https://developers.google.com/tech-writing/error-messages/error-handling

Erro 4xx seriam para problemas de input do usuário, como por exemplo:
- email já cadastrado
- senha muito curta
- nome muito longo
- etc

Erro 5xx seriam para problemas internos do servidor, como por exemplo:
- erro ao conectar ao banco de dados
- erro ao validar o token
- etc


these erros should return in this format for USER:
{
  "statusCode": 400,
  "message": "Bad Request",
  "error": "Bad Request",
}


these errors should return in this format for Log Database:
{
  "statusCode": 400,
  "message": "Bad Request",
  "error": "Bad Request",
  "timestamp": "2021-01-01T00:00:00.000Z",
  "path": "/api/v1/users"
}

*/