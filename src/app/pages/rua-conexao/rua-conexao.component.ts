import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RuaConexao } from '../../models/rua-conexao.model';
import { Bairro } from '../../models/bairro.model';
import { RuaConexaoService } from '../../services/rua-conexao.service';
import { BairroService } from '../../services/bairro.service';

@Component({
  selector: 'app-rua-conexao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>Gerenciamento de Ruas Conexões</h1>
      <form (ngSubmit)="salvarRuaConexao()" #ruaConexaoForm="ngForm">
        <div class="form-group">
          <label for="bairro_origem">Bairro Origem:</label>
          <select id="bairro_origem" name="bairro_origem" [(ngModel)]="ruaConexao.bairro_origem" required class="form-control">
            <option *ngFor="let b of bairros" [ngValue]="b">{{ b.nome }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="bairro_destino">Bairro Destino:</label>
          <select id="bairro_destino" name="bairro_destino" [(ngModel)]="ruaConexao.bairro_destino" required class="form-control">
            <option *ngFor="let b of bairros" [ngValue]="b">{{ b.nome }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="distancia">Distância (m):</label>
          <input type="number" id="distancia" name="distancia" [(ngModel)]="ruaConexao.distancia" required class="form-control" min="0">
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary" [disabled]="!ruaConexaoForm.form.valid">
            {{ ruaConexaoEditando ? 'Atualizar' : 'Criar' }} Conexão
          </button>
          <button type="button" class="btn btn-secondary" (click)="cancelarEdicao()" *ngIf="ruaConexaoEditando">
            Cancelar
          </button>
        </div>
      </form>
      <div class="grid">
        <div *ngFor="let r of ruasConexao" class="card">
          <h3>Conexão #{{ r.id }}</h3>
          <p>Origem: {{ getBairroNome(r.bairro_origem) }}</p>
          <p>Destino: {{ getBairroNome(r.bairro_destino) }}</p>
          <p>Distância: {{ r.distancia }} m</p>
          <div class="card-actions">
            <button class="btn btn-primary" (click)="editarRuaConexao(r)">Editar</button>
            <button class="btn btn-danger" (click)="deletarRuaConexao(r.id)">Deletar</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 2rem; }
    .form-group { margin-bottom: 1rem; }
    .form-control { width: 100%; padding: 0.5rem; margin-top: 0.25rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
    .card { border: 1px solid #ddd; padding: 1rem; border-radius: 4px; }
    .card-actions { display: flex; gap: 0.5rem; margin-top: 1rem; }
    .btn { padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer; }
    .btn-primary { background-color: #007bff; color: white; }
    .btn-secondary { background-color: #6c757d; color: white; }
    .btn-danger { background-color: #dc3545; color: white; }
  `]
})
export class RuaConexaoComponent implements OnInit {
  ruasConexao: RuaConexao[] = [];
  bairros: Bairro[] = [];
  ruaConexao: RuaConexao = {
    id: 0,
    distancia: 0,
    bairro_origem: { id: 0, nome: '' },
    bairro_destino: { id: 0, nome: '' }
  };
  ruaConexaoEditando = false;

  constructor(
    private ruaConexaoService: RuaConexaoService,
    private bairroService: BairroService
  ) {}

  ngOnInit(): void {
    this.carregarRuasConexao();
    this.carregarBairros();
  }

  carregarRuasConexao(): void {
    this.ruaConexaoService.listarRuasConexao().subscribe({
      next: (ruas) => {
        this.ruasConexao = ruas;
      },
      error: (error) => {
        console.error('Erro ao carregar ruas conexões:', error);
        alert(error.message || 'Erro ao carregar ruas conexões. Tente novamente.');
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

  salvarRuaConexao(): void {
    if (!this.ruaConexao.bairro_origem || !this.ruaConexao.bairro_origem.id) {
      alert('Selecione o bairro de origem.');
      return;
    }
    if (!this.ruaConexao.bairro_destino || !this.ruaConexao.bairro_destino.id) {
      alert('Selecione o bairro de destino.');
      return;
    }
    if (this.ruaConexao.bairro_origem.id === this.ruaConexao.bairro_destino.id) {
      alert('O bairro de origem não pode ser o mesmo que o de destino.');
      return;
    }
    const ruaParaSalvar = {
      id: this.ruaConexao.id,
      distancia: this.ruaConexao.distancia,
      bairroOrigem: { id: this.ruaConexao.bairro_origem.id },
      bairroDestino: { id: this.ruaConexao.bairro_destino.id }
    };
    if (this.ruaConexaoEditando) {
      this.ruaConexaoService.editarRuaConexao(ruaParaSalvar as any).subscribe({
        next: () => {
          this.carregarRuasConexao();
          this.cancelarEdicao();
          alert('Conexão atualizada com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao atualizar conexão:', error);
          alert(error.message || 'Erro ao atualizar conexão. Tente novamente.');
        }
      });
    } else {
      this.ruaConexaoService.criarRuaConexao(ruaParaSalvar as any).subscribe({
        next: () => {
          this.carregarRuasConexao();
          this.cancelarEdicao();
          alert('Conexão criada com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao criar conexão:', error);
          alert(error.message || 'Erro ao criar conexão. Tente novamente.');
        }
      });
    }
  }

  editarRuaConexao(rua: RuaConexao): void {
    this.ruaConexao = { ...rua };
    this.ruaConexaoEditando = true;
  }

  deletarRuaConexao(id: number): void {
    if (confirm('Tem certeza que deseja deletar esta conexão?')) {
      this.ruaConexaoService.deletarRuaConexao(id).subscribe({
        next: () => {
          this.carregarRuasConexao();
          alert('Conexão deletada com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao deletar conexão:', error);
          alert(error.message || 'Erro ao deletar conexão. Tente novamente.');
        }
      });
    }
  }

  cancelarEdicao(): void {
    this.ruaConexao = {
      id: 0,
      distancia: 0,
      bairro_origem: { id: 0, nome: '' },
      bairro_destino: { id: 0, nome: '' }
    };
    this.ruaConexaoEditando = false;
  }

  getBairroNome(bairro: any): string {
    return bairro && bairro.nome ? bairro.nome : 'N/A';
  }
} 