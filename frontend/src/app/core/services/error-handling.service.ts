import { Injectable } from '@angular/core';
import { AppError, HttpError } from '../models/error.model';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  normalizeError(error: unknown): AppError {
    if (error instanceof HttpError) {
      return error;
    }

    if (this.isHttpErrorResponse(error)) {
      return this.handleHttpError(error);
    }

    if (error instanceof Error) {
      return {
        message: error.message || 'Erro desconhecido',
        status: 500,
      };
    }

    return {
      message: 'Erro desconhecido no sistema',
      status: 500,
    };
  }

  private isHttpErrorResponse(error: unknown): error is {
    error?: { message?: string; errors?: string[] };
    status: number;
    statusText: string;
  } {
    return (
      typeof error === 'object' &&
      error !== null &&
      'status' in error &&
      typeof (error as { status: unknown }).status === 'number'
    );
  }

  private handleHttpError(error: {
    error?: { message?: string; errors?: string[] };
    status: number;
    statusText: string;
  }): AppError {
    const message = error.error?.message || this.getDefaultMessage(error.status);
    const details = error.error?.errors;

    return new HttpError(message, error.status, details);
  }

  private getDefaultMessage(status: number): string {
    switch (status) {
      case 400:
        return 'Dados inválidos enviados';
      case 401:
        return 'Não autorizado';
      case 403:
        return 'Acesso negado';
      case 404:
        return 'Recurso não encontrado';
      case 409:
        return 'Conflito de dados';
      case 422:
        return 'Dados não processáveis';
      case 500:
        return 'Erro interno do servidor';
      case 503:
        return 'Serviço indisponível';
      default:
        return `Erro na requisição (${status})`;
    }
  }
}
