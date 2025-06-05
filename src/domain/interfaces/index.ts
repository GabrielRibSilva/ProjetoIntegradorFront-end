// src/domain/interfaces/index.ts

// Interfaces principais
export interface IUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUserRegistration {
  id?: string;
  name: string;
  email: string;
  createdAt?: Date;
}

export interface IValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface IUserService {
  register(user: IUser): Promise<IApiResponse<IUserRegistration>>;
}

export interface INotificationService {
  showSuccess(message: string): void;
  showError(message: string): void;
}