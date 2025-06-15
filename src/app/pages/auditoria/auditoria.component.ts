import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auditoria } from '../../models/auditoria.model';
import { AuditoriaService } from '../../services/auditoria.service';

@Component({
  selector: 'app-auditoria',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Auditoria do Sistema</h1>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Descrição</th>
            <th>Operação</th>
            <th>Tabela</th>
            <th>ID Entidade</th>
            <th>Usuário</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let a of auditorias">
            <td>{{ a.id }}</td>
            <td>{{ a.dataOcorrencia }}</td>
            <td>{{ a.descricaoOcorrencia }}</td>
            <td>{{ a.operacao }}</td>
            <td>{{ a.tabela }}</td>
            <td>{{ a.idEntidade }}</td>
            <td>{{ a.usuario && a.usuario.nome ? a.usuario.nome : 'N/A' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .container { padding: 2rem; }
    .table { width: 100%; border-collapse: collapse; margin-top: 2rem; }
    th, td { border: 1px solid #ddd; padding: 0.5rem; text-align: left; }
    th { background: #f5f5f5; }
  `]
})
export class AuditoriaComponent implements OnInit {
  auditorias: Auditoria[] = [];

  constructor(private auditoriaService: AuditoriaService) {}

  ngOnInit(): void {
    this.auditoriaService.listarAuditorias().subscribe(
      (response: any) => {
        if (Array.isArray(response)) {
          this.auditorias = response;
        } else if (response && Array.isArray(response.content)) {
          this.auditorias = response.content;
        } else {
          this.auditorias = [];
        }
      },
      (error: any) => console.error('Erro ao carregar auditorias:', error)
    );
  }
} 