// src/services/index.ts
import { IUser, IUserRegistration, IApiResponse, IUserService, INotificationService } from '../domain/interfaces';

// UserService
export class UserService implements IUserService {
  private baseUrl: string = 'http://localhost:3001/api';
  
  async register(user: IUser): Promise<IApiResponse<IUserRegistration>> {
    try {
      const response = await fetch(`${this.baseUrl}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Erro ao cadastrar usuário',
          errors: data.errors || []
        };
      }
      
      return {
        success: true,
        data: data.user,
        message: 'Usuário cadastrado com sucesso!'
      };
      
    } catch (error) {
      return {
        success: false,
        message: 'Erro de conexão com o servidor',
        errors: ['Verifique sua conexão e tente novamente']
      };
    }
  }
}

// NotificationService
export class NotificationService implements INotificationService {
  showSuccess(message: string): void {
    // Integrar com react-toastify ou similar
    console.log('SUCCESS:', message);
    // toast.success(message);
  }
  
  showError(message: string): void {
    console.log('ERROR:', message);
    // toast.error(message);
  }
}