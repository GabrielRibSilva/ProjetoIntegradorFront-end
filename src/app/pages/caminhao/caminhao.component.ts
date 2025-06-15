import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CaminhaoService } from '../../services/caminhao.service';
import { Caminhao } from '../../models/caminhao.model';

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
          <label for="tipo_residuo">Tipo de Resíduo:</label>
          <input type="text" id="tipo_residuo" name="tipo_residuo" [(ngModel)]="caminhao.tipo_residuo" required class="form-control">
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" [disabled]="!caminhaoForm.form.valid">
            {{ caminhaoEditando ? 'Atualizar' : 'Criar' }} Caminhão
          </button>
          <button type="button" class="btn btn-secondary" (click)="cancelarEdicao()" *ngIf="caminhaoEditando">
            Cancelar
          </button>
        </div>
      </form>

      <div class="grid">
        <div *ngFor="let c of caminhoes" class="card">
          <h3>{{ c.placa }}</h3>
          <p>Capacidade: {{ c.capacidade_maxima }} kg</p>
          <p>Tipo de Resíduo: {{ c.tipo_residuo }}</p>
          <div class="card-actions">
            <button class="btn btn-primary" (click)="editarCaminhao(c)">Editar</button>
            <button class="btn btn-danger" (click)="deletarCaminhao(c.id)">Deletar</button>
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
  `]
})
export class CaminhaoComponent implements OnInit {
  caminhoes: Caminhao[] = [];
  caminhao: Caminhao = {
    id: 0,
    placa: '',
    capacidade_maxima: 0,
    tipo_residuo: ''
  };
  caminhaoEditando = false;

  constructor(private caminhaoService: CaminhaoService) {}

  ngOnInit(): void {
    this.carregarCaminhoes();
  }

  carregarCaminhoes(): void {
    this.caminhaoService.listarCaminhoes().subscribe({
      next: (caminhoes) => {
        this.caminhoes = caminhoes;
      },
      error: (error) => {
        console.error('Erro ao carregar caminhões:', error);
        alert(error.message || 'Erro ao carregar caminhões. Tente novamente.');
      }
    });
  }

  salvarCaminhao(): void {
    if (this.caminhaoEditando) {
      this.caminhaoService.editarCaminhao(this.caminhao).subscribe({
        next: () => {
          this.carregarCaminhoes();
          this.cancelarEdicao();
          alert('Caminhão atualizado com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao atualizar caminhão:', error);
          alert(error.message || 'Erro ao atualizar caminhão. Tente novamente.');
        }
      });
    } else {
      this.caminhaoService.criarCaminhao(this.caminhao).subscribe({
        next: () => {
          this.carregarCaminhoes();
          this.caminhao = {
            id: 0,
            placa: '',
            capacidade_maxima: 0,
            tipo_residuo: ''
          };
          alert('Caminhão criado com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao criar caminhão:', error);
          alert(error.message || 'Erro ao criar caminhão. Tente novamente.');
        }
      });
    }
  }

  editarCaminhao(caminhao: Caminhao): void {
    this.caminhao = { ...caminhao };
    this.caminhaoEditando = true;
  }

  deletarCaminhao(id: number): void {
    if (confirm('Tem certeza que deseja deletar este caminhão?')) {
      this.caminhaoService.deletarCaminhao(id).subscribe({
        next: () => {
          this.carregarCaminhoes();
          alert('Caminhão deletado com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao deletar caminhão:', error);
          alert(error.message || 'Erro ao deletar caminhão. Tente novamente.');
        }
      });
    }
  }

  cancelarEdicao(): void {
    this.caminhao = {
      id: 0,
      placa: '',
      capacidade_maxima: 0,
      tipo_residuo: ''
    };
    this.caminhaoEditando = false;
  }
} 