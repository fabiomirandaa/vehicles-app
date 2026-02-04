export interface AppError {
  message: string;
  status?: number;
  details?: string[];
}

export class HttpError extends Error implements AppError {
  constructor(
    public override message: string,
    public status: number = 500,
    public details?: string[]
  ) {
    super(message);
    this.name = 'HttpError';
  }
}
