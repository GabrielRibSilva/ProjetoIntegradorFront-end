import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="registro-form">
        <h1>Criar Conta</h1>
        <form (ngSubmit)="onSubmit()" #registroForm="ngForm">
          <div class="form-group">
            <label for="nome">Nome:</label>
            <input type="text" id="nome" name="nome" [(ngModel)]="usuario.nome" required class="form-control">
          </div>

          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" [(ngModel)]="usuario.email" required class="form-control">
          </div>

          <div class="form-group">
            <label for="senha">Senha:</label>
            <input type="password" id="senha" name="senha" [(ngModel)]="usuario.senha" required class="form-control">
          </div>

          <div class="form-group">
            <label for="telefone">Telefone:</label>
            <input type="tel" id="telefone" name="telefone" [(ngModel)]="usuario.telefone" required class="form-control">
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary" [disabled]="!registroForm.form.valid">Criar Conta</button>
            <button type="button" class="btn btn-secondary" (click)="irParaLogin()">Voltar para Login</button>
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
    .registro-form {
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
export class RegistroComponent {
  usuario: Usuario = {
    id: 0,
    nome: '',
    email: '',
    senha: '',
    telefone: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.authService.register(this.usuario).subscribe({
      next: () => {
        alert('Conta criada com sucesso! Faça login para continuar.');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erro ao criar conta:', error);
        if (error.error?.message?.includes('email') && error.error?.message?.includes('já existe')) {
          alert('Este e-mail já está cadastrado. Por favor, use outro e-mail ou faça login.');
        } else {
          alert('Erro ao criar conta. Tente novamente.');
        }
      }
    });
  }

  irParaLogin(): void {
    this.router.navigate(['/login']);
  }
} 