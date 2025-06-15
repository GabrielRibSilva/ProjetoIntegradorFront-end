import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RotaService } from '../../services/rota.service';
import { BairroService } from '../../services/bairro.service';
import { Rota } from '../../models/rota.model';
import { Bairro } from '../../models/bairro.model';

@Component({
  selector: 'app-rota',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>Gerenciamento de Rotas</h1>
      
      <form (ngSubmit)="salvarRota()" #rotaForm="ngForm">
        <div class="form-group">
          <label for="bairros">Bairros Visitados:</label>
          <select id="bairros" name="bairros" [(ngModel)]="bairrosSelecionados" multiple required class="form-control">
            <option *ngFor="let b of bairros" [ngValue]="b">{{ b.nome }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="distancia">Distância (km):</label>
          <input type="number" id="distancia" name="distancia" [(ngModel)]="rota.distancia" required class="form-control" step="0.01" min="0">
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" [disabled]="!rotaForm.form.valid">
            {{ rotaEditando ? 'Atualizar' : 'Criar' }} Rota
          </button>
          <button type="button" class="btn btn-secondary" (click)="cancelarEdicao()" *ngIf="rotaEditando">
            Cancelar
          </button>
        </div>
      </form>

      <div class="grid">
        <div *ngFor="let r of rotas" class="card">
          <h3>Rota #{{ r.id }}</h3>
          <p>Bairros Visitados:</p>
          <ul>
            <li *ngFor="let bairro of r.bairrosVisitados">{{ bairro.nome }}</li>
          </ul>
          <p>Distância: {{ r.distancia }} km</p>
          <div class="card-actions">
            <button class="btn btn-primary" (click)="editarRota(r)">Editar</button>
            <button class="btn btn-danger" (click)="deletarRota(r.id)">Deletar</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    .form-control {
      width: 100%;
      padding: 0.5rem;
      margin-top: 0.25rem;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }
    .card {
      border: 1px solid #ddd;
      padding: 1rem;
      border-radius: 4px;
    }
    .card-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }
    .btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-primary {
      background-color: #007bff;
      color: white;
    }
    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }
    .btn-danger {
      background-color: #dc3545;
      color: white;
    }
    select[multiple] {
      height: 150px;
    }
  `]
})
export class RotaComponent implements OnInit {
  rotas: Rota[] = [];
  bairros: Bairro[] = [];
  bairrosSelecionados: Bairro[] = [];
  rota: Rota = {
    id: 0,
    bairrosVisitados: [],
    distancia: 0
  };
  rotaEditando = false;

  constructor(
    private rotaService: RotaService,
    private bairroService: BairroService
  ) {}

  ngOnInit(): void {
    this.carregarRotas();
    this.carregarBairros();
  }

  carregarRotas(): void {
    this.rotaService.listarRotas().subscribe({
      next: (rotas) => {
        this.rotas = rotas;
      },
      error: (error) => {
        console.error('Erro ao carregar rotas:', error);
        alert(error.message || 'Erro ao carregar rotas. Tente novamente.');
      }
    });
  }

  carregarBairros(): void {
    this.bairroService.listarBairros().subscribe({
      next: (bairros) => {
        this.bairros = bairros;
      },
      error: (error) => {
        console.error('Erro ao carregar bairros:', error);
        alert(error.message || 'Erro ao carregar bairros. Tente novamente.');
      }
    });
  }

  salvarRota(): void {
    if (this.bairrosSelecionados.length === 0) {
      alert('Por favor, selecione pelo menos um bairro.');
      return;
    }

    const rotaParaSalvar: Rota = {
      ...this.rota,
      bairrosVisitados: this.bairrosSelecionados
    };

    if (this.rotaEditando) {
      this.rotaService.editarRota(rotaParaSalvar).subscribe({
        next: () => {
          this.carregarRotas();
          this.cancelarEdicao();
          alert('Rota atualizada com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao atualizar rota:', error);
          alert(error.message || 'Erro ao atualizar rota. Tente novamente.');
        }
      });
    } else {
      this.rotaService.criarRota(rotaParaSalvar).subscribe({
        next: () => {
          this.carregarRotas();
          this.cancelarEdicao();
          alert('Rota criada com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao criar rota:', error);
          alert(error.message || 'Erro ao criar rota. Tente novamente.');
        }
      });
    }
  }

  editarRota(rota: Rota): void {
    this.rota = { ...rota };
    this.bairrosSelecionados = [...rota.bairrosVisitados];
    this.rotaEditando = true;
  }

  deletarRota(id: number): void {
    if (confirm('Tem certeza que deseja deletar esta rota?')) {
      this.rotaService.deletarRota(id).subscribe({
        next: () => {
          this.carregarRotas();
          alert('Rota deletada com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao deletar rota:', error);
          alert(error.message || 'Erro ao deletar rota. Tente novamente.');
        }
      });
    }
  }

  cancelarEdicao(): void {
    this.rota = {
      id: 0,
      bairrosVisitados: [],
      distancia: 0
    };
    this.bairrosSelecionados = [];
    this.rotaEditando = false;
  }
} 