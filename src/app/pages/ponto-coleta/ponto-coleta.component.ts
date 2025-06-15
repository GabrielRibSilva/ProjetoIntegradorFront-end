import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PontoColetaService } from '../../services/ponto-coleta.service';
import { BairroService } from '../../services/bairro.service';
import { UsuarioService } from '../../services/usuario.service';
import { PontoColeta } from '../../models/ponto-coleta.model';
import { Bairro } from '../../models/bairro.model';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ponto-coleta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>Gerenciamento de Pontos de Coleta</h1>
      
      <form (ngSubmit)="salvarPontoColeta()" #pontoColetaForm="ngForm">
        <div class="form-group">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" name="nome" [(ngModel)]="pontoColeta.nome" required class="form-control">
        </div>

        <div class="form-group">
          <label for="endereco">Endereço:</label>
          <input type="text" id="endereco" name="endereco" [(ngModel)]="pontoColeta.endereco" required class="form-control">
        </div>

        <div class="form-group">
          <label for="horarioFuncionamento">Horário de Funcionamento:</label>
          <input type="text" id="horarioFuncionamento" name="horarioFuncionamento" [(ngModel)]="pontoColeta.horarioFuncionamento" required class="form-control">
        </div>

        <div class="form-group">
          <label for="residuosAceitaveis">Resíduos Aceitáveis:</label>
          <input type="text" id="residuosAceitaveis" name="residuosAceitaveis" [(ngModel)]="pontoColeta.residuosAceitaveis" required class="form-control">
        </div>

        <div class="form-group">
          <label for="bairro">Bairro:</label>
          <select id="bairro" name="bairro" [(ngModel)]="pontoColeta.bairro" required class="form-control">
            <option *ngFor="let b of bairros" [ngValue]="b">{{ b.nome }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="usuario">Usuário Responsável:</label>
          <select id="usuario" name="usuario" [(ngModel)]="pontoColeta.usuario" required class="form-control">
            <option *ngFor="let u of usuarios" [ngValue]="u">{{ u.nome }} ({{ u.email }})</option>
          </select>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" [disabled]="!pontoColetaForm.form.valid">
            {{ pontoColetaEditando ? 'Atualizar' : 'Criar' }} Ponto de Coleta
          </button>
          <button type="button" class="btn btn-secondary" (click)="cancelarEdicao()" *ngIf="pontoColetaEditando">
            Cancelar
          </button>
        </div>
      </form>

      <div class="grid">
        <div *ngFor="let p of pontosColeta" class="card">
          <h3>{{ p.nome }}</h3>
          <p>Endereço: {{ p.endereco }}</p>
          <p>Horário: {{ p.horarioFuncionamento }}</p>
          <p>Resíduos: {{ p.residuosAceitaveis }}</p>
          <p>Bairro: {{ getBairroNome(p.bairro) }}</p>
          <p>Responsável: {{ getUsuarioNome(p.usuario) }}</p>
          <div class="card-actions">
            <button class="btn btn-primary" (click)="editarPontoColeta(p)">Editar</button>
            <button class="btn btn-danger" (click)="deletarPontoColeta(p.id)">Deletar</button>
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
export class PontoColetaComponent implements OnInit {
  pontosColeta: PontoColeta[] = [];
  bairros: Bairro[] = [];
  usuarios: Usuario[] = [];
  pontoColeta: PontoColeta = {
    id: 0,
    nome: '',
    endereco: '',
    horarioFuncionamento: '',
    residuosAceitaveis: '',
    bairro: {
      id: 0,
      nome: ''
    },
    usuario: {
      id: 0,
      nome: '',
      senha: '',
      telefone: '',
      email: ''
    }
  };
  pontoColetaEditando = false;

  constructor(
    private pontoColetaService: PontoColetaService,
    private bairroService: BairroService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarPontosColeta();
    this.carregarBairros();
    this.carregarUsuarios();
  }

  carregarPontosColeta(): void {
    this.pontoColetaService.listarPontosColeta().subscribe({
      next: (pontosColeta) => {
        this.pontosColeta = pontosColeta;
      },
      error: (error) => {
        console.error('Erro ao carregar pontos de coleta:', error);
        alert(error.message || 'Erro ao carregar pontos de coleta. Tente novamente.');
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

  carregarUsuarios(): void {
    this.usuarioService.listarUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
        alert(error.message || 'Erro ao carregar usuários. Tente novamente.');
      }
    });
  }

  salvarPontoColeta(): void {
    // Validações
    if (!this.pontoColeta.bairro || !this.pontoColeta.bairro.id) {
      alert('Por favor, selecione um bairro.');
      return;
    }

    if (!this.pontoColeta.usuario || !this.pontoColeta.usuario.id) {
      alert('Por favor, selecione um usuário responsável.');
      return;
    }

    if (!this.pontoColeta.nome) {
      alert('Por favor, informe o nome do ponto de coleta.');
      return;
    }

    if (!this.pontoColeta.endereco) {
      alert('Por favor, informe o endereço.');
      return;
    }

    if (!this.pontoColeta.horarioFuncionamento) {
      alert('Por favor, informe o horário de funcionamento.');
      return;
    }

    if (!this.pontoColeta.residuosAceitaveis) {
      alert('Por favor, informe os resíduos aceitáveis.');
      return;
    }

    if (this.pontoColetaEditando) {
      this.pontoColetaService.editarPontoColeta(this.pontoColeta).subscribe({
        next: () => {
          this.carregarPontosColeta();
          this.cancelarEdicao();
          alert('Ponto de coleta atualizado com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao atualizar ponto de coleta:', error);
          alert(error.message || 'Erro ao atualizar ponto de coleta. Tente novamente.');
        }
      });
    } else {
      this.pontoColetaService.criarPontoColeta(this.pontoColeta).subscribe({
        next: () => {
          this.carregarPontosColeta();
          this.pontoColeta = {
            id: 0,
            nome: '',
            endereco: '',
            horarioFuncionamento: '',
            residuosAceitaveis: '',
            bairro: {
              id: 0,
              nome: ''
            },
            usuario: {
              id: 0,
              nome: '',
              senha: '',
              telefone: '',
              email: ''
            }
          };
          alert('Ponto de coleta criado com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao criar ponto de coleta:', error);
          alert(error.message || 'Erro ao criar ponto de coleta. Tente novamente.');
        }
      });
    }
  }

  editarPontoColeta(pontoColeta: PontoColeta): void {
    this.pontoColeta = { ...pontoColeta };
    this.pontoColetaEditando = true;
  }

  deletarPontoColeta(id: number): void {
    if (confirm('Tem certeza que deseja deletar este ponto de coleta?')) {
      this.pontoColetaService.deletarPontoColeta(id).subscribe({
        next: () => {
          this.carregarPontosColeta();
          alert('Ponto de coleta deletado com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao deletar ponto de coleta:', error);
          alert(error.message || 'Erro ao deletar ponto de coleta. Tente novamente.');
        }
      });
    }
  }

  cancelarEdicao(): void {
    this.pontoColeta = {
      id: 0,
      bairro: { id: 0, nome: '' },
      nome: '',
      usuario: { id: 0, nome: '', email: '', senha: '', telefone: '' },
      endereco: '',
      horarioFuncionamento: '',
      residuosAceitaveis: ''
    };
    this.pontoColetaEditando = false;
  }

  getBairroNome(bairro: any): string {
    return bairro && 'nome' in bairro ? bairro.nome : 'N/A';
  }

  getUsuarioNome(usuario: any): string {
    return usuario && 'nome' in usuario ? usuario.nome : 'Não definido';
  }
} 