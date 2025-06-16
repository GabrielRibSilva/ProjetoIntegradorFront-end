import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>Gerenciar Usuários</h1>
      <div class="content">
        <div class="form-section">
          <h2>Novo Usuário</h2>
          <form (ngSubmit)="onSubmit()" #usuarioForm="ngForm">
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
              <button type="submit" class="btn btn-primary" [disabled]="!usuarioForm.form.valid">Salvar</button>
              <button type="button" class="btn btn-secondary" (click)="voltar()">Voltar</button>
            </div>
          </form>
        </div>

        <div class="list-section">
          <h2>Usuários Cadastrados</h2>
          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let u of usuarios">
                  <td>{{ u.nome }}</td>
                  <td>{{ u.email }}</td>
                  <td>{{ u.telefone }}</td>
                  <td>
                    <button class="btn btn-sm btn-danger" (click)="excluirUsuario(u.id)">Excluir</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    h1 {
      color: #4CAF50;
      text-align: center;
      margin-bottom: 2rem;
    }
    .content {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 2rem;
    }
    .form-section, .list-section {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    h2 {
      color: #333;
      margin-bottom: 1.5rem;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    .form-control {
      width: 100%;
      padding: 0.75rem;
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
      transition: background-color 0.2s;
    }
    .btn-primary {
      background-color: #4CAF50;
      color: white;
    }
    .btn-primary:hover:not(:disabled) {
      background-color: #45a049;
    }
    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }
    .btn-secondary:hover {
      background-color: #5a6268;
    }
    .btn-danger {
      background-color: #dc3545;
      color: white;
    }
    .btn-danger:hover {
      background-color: #c82333;
    }
    .btn:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
    .table-responsive {
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #f8f9fa;
      font-weight: 600;
    }
    .btn-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
    }
  `]
})
export class UsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuario: Usuario = {
    id: 0,
    nome: '',
    email: '',
    senha: '',
    telefone: ''
  };

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.usuarioService.listarUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    });
  }

  onSubmit(): void {
    this.usuarioService.criarUsuario(this.usuario).subscribe({
      next: () => {
        this.carregarUsuarios();
        this.usuario = {
          id: 0,
          nome: '',
          email: '',
          senha: '',
          telefone: ''
        };
      },
      error: (error) => {
        console.error('Erro ao criar usuário:', error);
      }
    });
  }

  excluirUsuario(id: number): void {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.usuarioService.excluirUsuario(id).subscribe({
        next: () => {
          this.carregarUsuarios();
        },
        error: (error) => {
          console.error('Erro ao excluir usuário:', error);
        }
      });
    }
  }

  voltar(): void {
    this.router.navigate(['/dashboard']);
  }
} 