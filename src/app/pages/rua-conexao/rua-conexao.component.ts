import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RuaConexao } from '../../models/rua-conexao.model';
import { RuaConexaoService } from '../../services/rua-conexao.service';

@Component({
  selector: 'app-rua-conexao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Gerenciar Conexões entre Ruas</h2>
      
      <div class="form-container">
        <h3>{{ ruaConexaoEditando ? 'Editar' : 'Nova' }} Conexão</h3>
        <form (ngSubmit)="onSubmit()" #ruaConexaoForm="ngForm">
          <div class="form-group">
            <label for="ruaOrigem">Rua de Origem:</label>
            <input 
              type="number" 
              id="ruaOrigem" 
              name="ruaOrigem" 
              [(ngModel)]="ruaConexao.ruaOrigem" 
              required 
              class="form-control">
          </div>

          <div class="form-group">
            <label for="ruaDestino">Rua de Destino:</label>
            <input 
              type="number" 
              id="ruaDestino" 
              name="ruaDestino" 
              [(ngModel)]="ruaConexao.ruaDestino" 
              required 
              class="form-control">
          </div>

          <div class="form-group">
            <label for="distancia">Distância (metros):</label>
            <input 
              type="number" 
              id="distancia" 
              name="distancia" 
              [(ngModel)]="ruaConexao.distancia" 
              required 
              class="form-control">
          </div>

          <div class="form-group">
            <label for="tempoEstimado">Tempo Estimado (minutos):</label>
            <input 
              type="number" 
              id="tempoEstimado" 
              name="tempoEstimado" 
              [(ngModel)]="ruaConexao.tempoEstimado" 
              required 
              class="form-control">
          </div>

          <div class="form-actions">
            <button 
              type="submit" 
              class="btn btn-primary" 
              [disabled]="!ruaConexaoForm.form.valid">
              {{ ruaConexaoEditando ? 'Atualizar' : 'Criar' }}
            </button>
            <button 
              type="button" 
              class="btn btn-secondary" 
              (click)="cancelarEdicao()">
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <div class="list-container">
        <h3>Conexões Cadastradas</h3>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Rua Origem</th>
                <th>Rua Destino</th>
                <th>Distância</th>
                <th>Tempo Estimado</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let rc of ruasConexoes">
                <td>{{ rc.id }}</td>
                <td>{{ rc.ruaOrigem }}</td>
                <td>{{ rc.ruaDestino }}</td>
                <td>{{ rc.distancia }}m</td>
                <td>{{ rc.tempoEstimado }}min</td>
                <td>
                  <button 
                    class="btn btn-sm btn-primary" 
                    (click)="editarRuaConexao(rc)">
                    Editar
                  </button>
                  <button 
                    class="btn btn-sm btn-danger" 
                    (click)="deletarRuaConexao(rc.id)">
                    Excluir
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
    }
    .form-container {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
    }
    .list-container {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
    .btn-secondary:hover:not(:disabled) {
      background-color: #5a6268;
    }
    .btn-danger {
      background-color: #dc3545;
      color: white;
    }
    .btn-danger:hover:not(:disabled) {
      background-color: #c82333;
    }
    .btn:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
      opacity: 0.7;
    }
    .table {
      width: 100%;
      border-collapse: collapse;
    }
    .table th,
    .table td {
      padding: 0.75rem;
      border-bottom: 1px solid #ddd;
      text-align: left;
    }
    .table th {
      background-color: #f8f9fa;
      font-weight: 600;
    }
    .btn-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
      margin-right: 0.5rem;
    }
  `]
})
export class RuaConexaoComponent implements OnInit {
  ruasConexoes: RuaConexao[] = [];
  ruaConexao: RuaConexao = {
    id: 0,
    ruaOrigem: 0,
    ruaDestino: 0,
    distancia: 0,
    tempoEstimado: 0
  };
  ruaConexaoEditando = false;

  constructor(private ruaConexaoService: RuaConexaoService) {}

  ngOnInit(): void {
    this.carregarRuasConexoes();
  }

  carregarRuasConexoes(): void {
    this.ruaConexaoService.getRuasConexoes().subscribe({
      next: (ruas: RuaConexao[]) => {
        this.ruasConexoes = ruas;
      },
      error: (error: any) => {
        console.error('Erro ao carregar conexões:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.ruaConexaoEditando) {
      this.ruaConexaoService.atualizarRuaConexao(this.ruaConexao.id, this.ruaConexao).subscribe({
        next: () => {
          this.carregarRuasConexoes();
          this.cancelarEdicao();
        },
        error: (error: any) => {
          console.error('Erro ao atualizar conexão:', error);
        }
      });
    } else {
      this.ruaConexaoService.criarRuaConexao(this.ruaConexao).subscribe({
        next: () => {
          this.carregarRuasConexoes();
          this.cancelarEdicao();
        },
        error: (error: any) => {
          console.error('Erro ao criar conexão:', error);
        }
      });
    }
  }

  editarRuaConexao(ruaConexao: RuaConexao): void {
    this.ruaConexao = { ...ruaConexao };
    this.ruaConexaoEditando = true;
  }

  deletarRuaConexao(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta conexão?')) {
      this.ruaConexaoService.deletarRuaConexao(id).subscribe({
        next: () => {
          this.carregarRuasConexoes();
        },
        error: (error: any) => {
          console.error('Erro ao deletar conexão:', error);
        }
      });
    }
  }

  cancelarEdicao(): void {
    this.ruaConexao = {
      id: 0,
      ruaOrigem: 0,
      ruaDestino: 0,
      distancia: 0,
      tempoEstimado: 0
    };
    this.ruaConexaoEditando = false;
  }
} 