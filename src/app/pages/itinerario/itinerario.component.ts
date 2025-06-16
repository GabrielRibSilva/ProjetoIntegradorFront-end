import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItinerarioService } from '../../services/itinerario.service';
import { CaminhaoService } from '../../services/caminhao.service';
import { BairroService } from '../../services/bairro.service';
import { UsuarioService } from '../../services/usuario.service';
import { ResiduoService } from '../../services/residuo.service';
import { Itinerario, ItinerarioDTO } from '../../models/itinerario.model';
import { Caminhao } from '../../models/caminhao.model';
import { Bairro } from '../../models/bairro.model';
import { Usuario } from '../../models/usuario.model';
import { Residuo } from '../../models/trash.model';

@Component({
  selector: 'app-itinerario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>Gerenciamento de Itinerários</h1>
      
      <form (ngSubmit)="salvarItinerario()" #itinerarioForm="ngForm">
        <div class="form-group">
          <label for="caminhao">Caminhão:</label>
          <select id="caminhao" name="caminhao" [(ngModel)]="itinerarioDTO.caminhaoId" required class="form-control">
            <option value="">Selecione um caminhão</option>
            <option *ngFor="let c of caminhoes" [ngValue]="c.id">{{ c.placa }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="bairroOrigem">Bairro de Origem:</label>
          <select id="bairroOrigem" name="bairroOrigem" [(ngModel)]="itinerarioDTO.origemId" required class="form-control">
            <option value="">Selecione um bairro de origem</option>
            <option *ngFor="let b of bairros" [ngValue]="b.id">{{ b.nome }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="bairroDestino">Bairro de Destino:</label>
          <select id="bairroDestino" name="bairroDestino" [(ngModel)]="itinerarioDTO.destinoId" required class="form-control">
            <option value="">Selecione um bairro de destino</option>
            <option *ngFor="let b of bairros" [ngValue]="b.id">{{ b.nome }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="usuario">Usuário Responsável:</label>
          <select id="usuario" name="usuario" [(ngModel)]="itinerarioDTO.responsavelId" required class="form-control">
            <option value="">Selecione um usuário</option>
            <option *ngFor="let u of usuarios" [ngValue]="u.id">{{ u.nome }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="residuo">Tipo de Resíduo:</label>
          <select id="residuo" name="residuo" [(ngModel)]="itinerarioDTO.residuoId" required class="form-control">
            <option value="">Selecione um tipo de resíduo</option>
            <option *ngFor="let r of residuos" [ngValue]="r.id">{{ r.tipo }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="dataExecucao">Data de Execução:</label>
          <input type="datetime-local" id="dataExecucao" name="dataExecucao" [(ngModel)]="itinerarioDTO.dataExecucao" required class="form-control">
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" [disabled]="!itinerarioForm.form.valid">
            {{ itinerarioEditando ? 'Atualizar' : 'Criar' }} Itinerário
          </button>
          <button type="button" class="btn btn-secondary" (click)="limparFormulario()">
            Cancelar
          </button>
        </div>
      </form>

      <div class="grid">
        <div *ngFor="let i of itinerarios" class="card">
          <h3>Itinerário #{{ i.id }}</h3>
          <p><strong>Caminhão:</strong> {{ getCaminhaoInfo(i.caminhao) }}</p>
          <p><strong>Responsável:</strong> {{ i.responsavel.nome }}</p>
          <p><strong>Tipo de Resíduo:</strong> {{ i.residuo.tipo }}</p>
          <p><strong>Data de Execução:</strong> {{ formatarData(i.dataExecucao) }}</p>
          <p><strong>Rota:</strong></p>
          <ul>
            <li *ngFor="let bairro of i.rota.bairrosVisitados">
              {{ bairro.nome }}
            </li>
          </ul>
          <p><strong>Distância Total:</strong> {{ i.rota.distancia }} km</p>
          <div class="card-actions">
            <button class="btn btn-primary" (click)="editarItinerario(i)">Editar</button>
            <button class="btn btn-danger" (click)="deletarItinerario(i.id)">Excluir</button>
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
export class ItinerarioComponent implements OnInit {
  itinerarios: Itinerario[] = [];
  caminhoes: Caminhao[] = [];
  bairros: Bairro[] = [];
  usuarios: Usuario[] = [];
  residuos: Residuo[] = [];
  itinerarioDTO: ItinerarioDTO = {
    responsavelId: 0,
    caminhaoId: 0,
    origemId: 0,
    destinoId: 0,
    dataExecucao: '',
    residuoId: 0
  };
  itinerarioEditando = false;

  constructor(
    private itinerarioService: ItinerarioService,
    private caminhaoService: CaminhaoService,
    private bairroService: BairroService,
    private usuarioService: UsuarioService,
    private residuoService: ResiduoService
  ) {}

  ngOnInit(): void {
    this.carregarItinerarios();
    this.carregarCaminhoes();
    this.carregarBairros();
    this.carregarUsuarios();
    this.carregarResiduos();
  }

  carregarItinerarios(): void {
    this.itinerarioService.listarItinerarios().subscribe({
      next: (itinerarios) => {
        this.itinerarios = itinerarios;
      },
      error: (error) => {
        console.error('Erro ao carregar itinerários:', error);
      }
    });
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

  carregarBairros(): void {
    this.bairroService.listarBairros().subscribe({
      next: (bairros) => {
        this.bairros = bairros;
      },
      error: (error) => {
        console.error('Erro ao carregar bairros:', error);
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

  salvarItinerario(): void {
    if (this.itinerarioEditando) {
      // TODO: Implementar atualização quando necessário
    } else {
      this.itinerarioService.criarItinerario(this.itinerarioDTO).subscribe({
        next: () => {
          this.carregarItinerarios();
          this.limparFormulario();
        },
        error: (error) => {
          console.error('Erro ao criar itinerário:', error);
        }
      });
    }
  }

  editarItinerario(itinerario: Itinerario): void {
    this.itinerarioDTO = {
      responsavelId: itinerario.responsavel.id,
      caminhaoId: itinerario.caminhao.id,
      origemId: itinerario.rota.bairrosVisitados[0].id,
      destinoId: itinerario.rota.bairrosVisitados[itinerario.rota.bairrosVisitados.length - 1].id,
      dataExecucao: itinerario.dataExecucao,
      residuoId: itinerario.residuo.id
    };
    this.itinerarioEditando = true;
  }

  deletarItinerario(id: number): void {
    if (confirm('Tem certeza que deseja excluir este itinerário?')) {
      this.itinerarioService.deletarItinerario(id).subscribe({
        next: () => {
          this.carregarItinerarios();
        },
        error: (error) => {
          console.error('Erro ao deletar itinerário:', error);
        }
      });
    }
  }

  limparFormulario(): void {
    this.itinerarioDTO = {
      responsavelId: 0,
      caminhaoId: 0,
      origemId: 0,
      destinoId: 0,
      dataExecucao: '',
      residuoId: 0
    };
    this.itinerarioEditando = false;
  }

  getCaminhaoInfo(caminhao: Caminhao): string {
    return caminhao.placa;
  }

  formatarData(data: string): string {
    return new Date(data).toLocaleString();
  }
} 