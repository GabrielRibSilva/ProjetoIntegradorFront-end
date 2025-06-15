import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Itinerario } from '../../models/itinerario.model';
import { Caminhao } from '../../models/caminhao.model';
import { Usuario } from '../../models/usuario.model';
import { Rota } from '../../models/rota.model';
import { ItinerarioService } from '../../services/itinerario.service';
import { CaminhaoService } from '../../services/caminhao.service';
import { UsuarioService } from '../../services/usuario.service';
import { RotaService } from '../../services/rota.service';

@Component({
  selector: 'app-itinerario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>Gerenciamento de Itinerários</h1>
      <form (ngSubmit)="salvarItinerario()" #itinerarioForm="ngForm">
        <div class="form-group">
          <label for="data_execucao">Data de Execução:</label>
          <input type="date" id="data_execucao" name="data_execucao" [(ngModel)]="itinerario.data_execucao" required class="form-control">
        </div>
        <div class="form-group">
          <label for="tipos_residuo">Tipos de Resíduo:</label>
          <input type="text" id="tipos_residuo" name="tipos_residuo" [(ngModel)]="itinerario.tipos_residuo" required class="form-control">
        </div>
        <div class="form-group">
          <label for="caminhao">Caminhão:</label>
          <select id="caminhao" name="caminhao" [(ngModel)]="itinerario.caminhao" required class="form-control">
            <option *ngFor="let c of caminhoes" [ngValue]="c">{{ c.placa }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="usuario">Usuário:</label>
          <select id="usuario" name="usuario" [(ngModel)]="itinerario.usuario" required class="form-control">
            <option *ngFor="let u of usuarios" [ngValue]="u">{{ u.nome }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="rota">Rota:</label>
          <select id="rota" name="rota" [(ngModel)]="itinerario.rota" required class="form-control">
            <option *ngFor="let r of rotas" [ngValue]="r">Rota #{{ r.id }}</option>
          </select>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary" [disabled]="!itinerarioForm.form.valid">
            {{ itinerarioEditando ? 'Atualizar' : 'Criar' }} Itinerário
          </button>
          <button type="button" class="btn btn-secondary" (click)="cancelarEdicao()" *ngIf="itinerarioEditando">
            Cancelar
          </button>
        </div>
      </form>
      <div class="grid">
        <div *ngFor="let i of itinerarios" class="card">
          <h3>Itinerário #{{ i.id }}</h3>
          <p>Data: {{ i.data_execucao }}</p>
          <p>Tipos de Resíduo: {{ i.tipos_residuo }}</p>
          <p>Caminhão: {{ i.caminhao.placa }}</p>
          <p>Usuário: {{ i.usuario.nome }}</p>
          <p>Rota: #{{ i.rota.id }}</p>
          <div class="card-actions">
            <button class="btn btn-primary" (click)="editarItinerario(i)">Editar</button>
            <button class="btn btn-danger" (click)="deletarItinerario(i.id)">Deletar</button>
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
export class ItinerarioComponent implements OnInit {
  itinerarios: Itinerario[] = [];
  caminhoes: Caminhao[] = [];
  usuarios: Usuario[] = [];
  rotas: Rota[] = [];
  itinerario: Itinerario = {
    id: 0,
    data_execucao: '',
    tipos_residuo: '',
    caminhao: { id: 0, placa: '', capacidade_maxima: 0, tipo_residuo: '' },
    usuario: { id: 0, nome: '', senha: '', telefone: '', email: '' },
    rota: { id: 0, bairrosVisitados: [], distancia: 0 }
  };
  itinerarioEditando = false;

  constructor(
    private itinerarioService: ItinerarioService,
    private caminhaoService: CaminhaoService,
    private usuarioService: UsuarioService,
    private rotaService: RotaService
  ) {}

  ngOnInit(): void {
    this.carregarItinerarios();
    this.carregarCaminhoes();
    this.carregarUsuarios();
    this.carregarRotas();
  }

  carregarItinerarios(): void {
    this.itinerarioService.listarItinerarios().subscribe(
      (itinerarios: any) => this.itinerarios = itinerarios,
      (error: any) => console.error('Erro ao carregar itinerários:', error)
    );
  }

  carregarCaminhoes(): void {
    this.caminhaoService.listarCaminhoes().subscribe(
      caminhoes => this.caminhoes = caminhoes,
      error => console.error('Erro ao carregar caminhões:', error)
    );
  }

  carregarUsuarios(): void {
    this.usuarioService.listarUsuarios().subscribe(
      usuarios => this.usuarios = usuarios,
      error => console.error('Erro ao carregar usuários:', error)
    );
  }

  carregarRotas(): void {
    this.rotaService.listarRotas().subscribe(
      rotas => this.rotas = rotas,
      error => console.error('Erro ao carregar rotas:', error)
    );
  }

  salvarItinerario(): void {
    if (this.itinerarioEditando) {
      this.itinerarioService.editarItinerario(this.itinerario).subscribe(
        () => {
          this.carregarItinerarios();
          this.cancelarEdicao();
        },
        (error: any) => console.error('Erro ao atualizar itinerário:', error)
      );
    } else {
      this.itinerarioService.criarItinerario(this.itinerario).subscribe(
        () => {
          this.carregarItinerarios();
          this.cancelarEdicao();
        },
        (error: any) => console.error('Erro ao criar itinerário:', error)
      );
    }
  }

  editarItinerario(itinerario: Itinerario): void {
    this.itinerario = { ...itinerario };
    this.itinerarioEditando = true;
  }

  deletarItinerario(id: number): void {
    if (confirm('Tem certeza que deseja deletar este itinerário?')) {
      this.itinerarioService.deletarItinerario(id).subscribe(
        () => this.carregarItinerarios(),
        (error: any) => console.error('Erro ao deletar itinerário:', error)
      );
    }
  }

  cancelarEdicao(): void {
    this.itinerario = {
      id: 0,
      data_execucao: '',
      tipos_residuo: '',
      caminhao: { id: 0, placa: '', capacidade_maxima: 0, tipo_residuo: '' },
      usuario: { id: 0, nome: '', senha: '', telefone: '', email: '' },
      rota: { id: 0, bairrosVisitados: [], distancia: 0 }
    };
    this.itinerarioEditando = false;
  }
} 