import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ResiduoService } from '../../services/residuo.service';
import { Residuo } from '../../models/residuo.model';

@Component({
  selector: 'app-residuo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>Gerenciar Resíduos</h1>
      <div class="content">
        <div class="form-section">
          <h2>Novo Resíduo</h2>
          <form (ngSubmit)="onSubmit()" #residuoForm="ngForm">
            <div class="form-group">
              <label for="tipo">Tipo:</label>
              <input type="text" id="tipo" name="tipo" [(ngModel)]="residuo.tipo" required class="form-control">
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary" [disabled]="!residuoForm.form.valid">Salvar</button>
              <button type="button" class="btn btn-secondary" (click)="voltar()">Voltar</button>
            </div>
          </form>
        </div>

        <div class="list-section">
          <h2>Resíduos Cadastrados</h2>
          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tipo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let r of residuos">
                  <td>{{ r.id }}</td>
                  <td>{{ r.tipo }}</td>
                  <td>
                    <button class="btn btn-sm btn-danger" (click)="excluirResiduo(r.id)">Excluir</button>
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
export class ResiduoComponent implements OnInit {
  residuos: Residuo[] = [];
  residuo: Residuo = {
    id: 0,
    tipo: ''
  };

  constructor(
    private authService: AuthService,
    private residuoService: ResiduoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    this.carregarResiduos();
  }

  carregarResiduos(): void {
    this.residuoService.listarResiduos().subscribe({
      next: (residuos) => {
        this.residuos = residuos;
      },
      error: (error) => {
        console.error('Erro ao carregar resíduos:', error);
      }
    });
  }

  onSubmit(): void {
    this.residuoService.criarResiduo(this.residuo).subscribe({
      next: () => {
        this.carregarResiduos();
        this.residuo = {
          id: 0,
          tipo: ''
        };
      },
      error: (error) => {
        console.error('Erro ao criar resíduo:', error);
      }
    });
  }

  excluirResiduo(id: number): void {
    if (confirm('Tem certeza que deseja excluir este resíduo?')) {
      this.residuoService.excluirResiduo(id).subscribe({
        next: () => {
          this.carregarResiduos();
        },
        error: (error) => {
          console.error('Erro ao excluir resíduo:', error);
        }
      });
    }
  }

  voltar(): void {
    this.router.navigate(['/home']);
  }
} 