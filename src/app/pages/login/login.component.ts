import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="login-form">
        <h1>EcoRoute</h1>
        <h2>Login</h2>
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" [(ngModel)]="email" required class="form-control">
          </div>

          <div class="form-group">
            <label for="senha">Senha:</label>
            <input type="password" id="senha" name="senha" [(ngModel)]="senha" required class="form-control">
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary" [disabled]="!loginForm.form.valid">Entrar</button>
            <button type="button" class="btn btn-secondary" (click)="irParaRegistro()">Criar Conta</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f5f5f5;
    }
    .login-form {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }
    h1 {
      color: #4CAF50;
      text-align: center;
      margin-bottom: 0.5rem;
    }
    h2 {
      color: #333;
      text-align: center;
      margin-bottom: 2rem;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    .form-control {
      width: 100%;
      padding: 0.75rem;
      margin-top: 0.25rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
    }
    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      flex: 1;
      transition: background-color 0.2s;
    }
    .btn-primary {
      background-color: #4CAF50;
      color: white;
    }
    .btn-primary:hover {
      background-color: #45a049;
    }
    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }
    .btn-secondary:hover {
      background-color: #5a6268;
    }
    .btn:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  `]
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.authService.login(this.email, this.senha).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido:', response);
        if (this.authService.isAuthenticated()) {
          this.router.navigate(['/home']);
        } else {
          alert('Erro ao fazer login. Tente novamente.');
        }
      },
      error: (error) => {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login. Verifique suas credenciais.');
      }
    });
  }

  irParaRegistro(): void {
    this.router.navigate(['/registro']);
  }
} 