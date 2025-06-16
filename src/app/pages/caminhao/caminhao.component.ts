import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CaminhaoService } from '../../services/caminhao.service';
import { ResiduoService } from '../../services/residuo.service';
import { Caminhao } from '../../models/caminhao.model';
import { Residuo } from '../../models/trash.model';

@Component({
  selector: 'app-caminhao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>Gerenciamento de Caminhões</h1>
      
      <form (ngSubmit)="salvarCaminhao()" #caminhaoForm="ngForm">
        <div class="form-group">
          <label for="placa">Placa:</label>
          <input type="text" id="placa" name="placa" [(ngModel)]="caminhao.placa" required class="form-control">
        </div>

        <div class="form-group">
          <label for="capacidade_maxima">Capacidade Máxima (kg):</label>
          <input type="number" id="capacidade_maxima" name="capacidade_maxima" [(ngModel)]="caminhao.capacidade_maxima" required class="form-control">
        </div>

        <div class="form-group">
          <label for="residuos">Tipos de Resíduos Transportados:</label>
          <select id="residuos" name="residuos" [(ngModel)]="caminhao.residuosTransportados" multiple class="form-control">
            <option *ngFor="let r of residuos" [ngValue]="r">{{ r.tipo }}</option>
          </select>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" [disabled]="!caminhaoForm.form.valid">
            {{ caminhao.id ? 'Atualizar' : 'Criar' }} Caminhão
          </button>
          <button type="button" class="btn btn-secondary" (click)="limparFormulario()">
            Cancelar
          </button>
        </div>
      </form>

      <div class="grid">
        <div *ngFor="let c of caminhoes" class="card">
          <h3>Caminhão #{{ c.id }}</h3>
          <p><strong>Placa:</strong> {{ c.placa }}</p>
          <p><strong>Capacidade Máxima:</strong> {{ c.capacidade_maxima }} kg</p>
          <p><strong>Tipos de Resíduos:</strong></p>
          <ul>
            <li *ngFor="let r of c.residuosTransportados">{{ r.tipo }}</li>
          </ul>
          <div class="card-actions">
            <button class="btn btn-primary" (click)="editarCaminhao(c)">Editar</button>
            <button class="btn btn-danger" (click)="deletarCaminhao(c.id)">Excluir</button>
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
    .form-group {
      margin-bottom: 1.5rem;
    }
    .form-control {
      width: 100%;
      padding: 0.75rem;
      margin-top: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }
    .card {
      border: 1px solid #ddd;
      padding: 1.5rem;
      border-radius: 8px;
      background-color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .card h3 {
      margin: 0 0 1rem 0;
      color: #333;
    }
    .card p {
      margin: 0.5rem 0;
      color: #666;
    }
    .card p strong {
      color: #333;
    }
    .card ul {
      margin: 0.5rem 0;
      padding-left: 1.5rem;
    }
    .card li {
      color: #666;
      margin: 0.25rem 0;
    }
    .card-actions {
      display: flex;
      gap: 0.75rem;
      margin-top: 1.5rem;
    }
    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s;
    }
    .btn-primary {
      background-color: #007bff;
      color: white;
    }
    .btn-primary:hover {
      background-color: #0056b3;
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
  `]
})
export class CaminhaoComponent implements OnInit {
  caminhoes: Caminhao[] = [];
  residuos: Residuo[] = [];
  caminhao: Caminhao = {
    id: 0,
    placa: '',
    capacidade_maxima: 0,
    residuosTransportados: []
  };

  constructor(
    private caminhaoService: CaminhaoService,
    private residuoService: ResiduoService
  ) {}

  ngOnInit(): void {
    this.carregarCaminhoes();
    this.carregarResiduos();
  }

  carregarCaminhoes(): void {
    this.caminhaoService.listarCaminhoes().subscribe({
      next: (caminhoes) => {
        this.caminhoes = caminhoes;
      },
      error: (error) => {
        console.error('Erro ao carregar caminhões:', error);
      }
    });
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

  salvarCaminhao(): void {
    if (this.caminhao.id) {
      this.caminhaoService.atualizarCaminhao(this.caminhao.id, this.caminhao).subscribe({
        next: () => {
          this.carregarCaminhoes();
          this.limparFormulario();
        },
        error: (error) => {
          console.error('Erro ao atualizar caminhão:', error);
        }
      });
    } else {
      this.caminhaoService.criarCaminhao(this.caminhao).subscribe({
        next: () => {
          this.carregarCaminhoes();
          this.limparFormulario();
        },
        error: (error) => {
          console.error('Erro ao criar caminhão:', error);
        }
      });
    }
  }

  editarCaminhao(caminhao: Caminhao): void {
    this.caminhao = { ...caminhao };
  }

  deletarCaminhao(id: number): void {
    if (confirm('Tem certeza que deseja excluir este caminhão?')) {
      this.caminhaoService.deletarCaminhao(id).subscribe({
        next: () => {
          this.carregarCaminhoes();
        },
        error: (error) => {
          console.error('Erro ao deletar caminhão:', error);
        }
      });
    }
  }

  limparFormulario(): void {
    this.caminhao = {
      id: 0,
      placa: '',
      capacidade_maxima: 0,
      residuosTransportados: []
    };
  }
} 