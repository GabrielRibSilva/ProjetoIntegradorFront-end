import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BairroService } from '../../services/bairro.service';
import { Bairro } from '../../models/bairro.model';

@Component({
  selector: 'app-bairro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>Gerenciamento de Bairros</h1>
      
      <form (ngSubmit)="salvarBairro()" #bairroForm="ngForm">
        <div class="form-group">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" name="nome" [(ngModel)]="bairro.nome" required class="form-control">
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" [disabled]="!bairroForm.form.valid">
            {{ bairroEditando ? 'Atualizar' : 'Criar' }} Bairro
          </button>
          <button type="button" class="btn btn-secondary" (click)="cancelarEdicao()" *ngIf="bairroEditando">
            Cancelar
          </button>
        </div>
      </form>

      <div class="grid">
        <div *ngFor="let b of bairros" class="card">
          <h3>{{ b.nome }}</h3>
          <div class="card-actions">
            <button class="btn btn-primary" (click)="editarBairro(b)">Editar</button>
            <button class="btn btn-danger" (click)="deletarBairro(b.id)">Deletar</button>
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
export class BairroComponent implements OnInit {
  bairros: Bairro[] = [];
  bairro: Bairro = {
    id: 0,
    nome: ''
  };
  bairroEditando = false;

  constructor(private bairroService: BairroService) {}

  ngOnInit(): void {
    this.carregarBairros();
  }

  carregarBairros(): void {
    this.bairroService.listarBairros().subscribe(
      bairros => this.bairros = bairros,
      error => console.error('Erro ao carregar bairros:', error)
    );
  }

  salvarBairro(): void {
    if (this.bairroEditando) {
      this.bairroService.editarBairro(this.bairro).subscribe({
        next: () => {
          this.carregarBairros();
          this.cancelarEdicao();
          alert('Bairro atualizado com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao atualizar bairro:', error);
          alert(error.message || 'Erro ao atualizar bairro. Tente novamente.');
        }
      });
    } else {
      this.bairroService.criarBairro(this.bairro).subscribe({
        next: () => {
          this.carregarBairros();
          this.bairro = {
            id: 0,
            nome: ''
          };
          alert('Bairro criado com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao criar bairro:', error);
          alert(error.message || 'Erro ao criar bairro. Tente novamente.');
        }
      });
    }
  }

  editarBairro(bairro: Bairro): void {
    this.bairro = { ...bairro };
    this.bairroEditando = true;
  }

  deletarBairro(id: number): void {
    if (confirm('Tem certeza que deseja deletar este bairro?')) {
      this.bairroService.deletarBairro(id).subscribe({
        next: () => {
          this.carregarBairros();
          alert('Bairro deletado com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao deletar bairro:', error);
          alert(error.message || 'Erro ao deletar bairro. Tente novamente.');
        }
      });
    }
  }

  cancelarEdicao(): void {
    this.bairro = {
      id: 0,
      nome: ''
    };
    this.bairroEditando = false;
  }
} 