import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Bairro {
  id?: number;
  nome: string;
  // Adicione outros campos conforme necessário
}

@Component({
  selector: 'app-bairro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bairro-container">
      <h2>Gerenciamento de Bairros</h2>
      
      <!-- Formulário de Cadastro/Edição -->
      <form (ngSubmit)="onSubmit()" class="bairro-form">
        <div class="form-group">
          <label for="nome">Nome do Bairro:</label>
          <input type="text" id="nome" [(ngModel)]="bairro.nome" name="nome" required>
        </div>
        <button type="submit">{{ bairro.id ? 'Atualizar' : 'Cadastrar' }}</button>
      </form>

      <!-- Lista de Bairros -->
      <div class="bairro-list">
        <h3>Bairros Cadastrados</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let b of bairros">
              <td>{{ b.id }}</td>
              <td>{{ b.nome }}</td>
              <td>
                <button (click)="editarBairro(b)" class="btn-edit">Editar</button>
                <button (click)="deletarBairro(b.id)" class="btn-delete">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .bairro-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .bairro-form {
      margin-bottom: 30px;
      padding: 20px;
      background-color: #f8f9fa;
      border-radius: 4px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 5px;
    }
    .btn-edit {
      background-color: #ffc107;
      color: #000;
    }
    .btn-delete {
      background-color: #dc3545;
      color: white;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #f8f9fa;
    }
  `]
})
export class BairroComponent implements OnInit {
  bairros: Bairro[] = [];
  bairro: Bairro = { nome: '' };

  ngOnInit() {
    // Carregar lista de bairros
    this.carregarBairros();
  }

  carregarBairros() {
    // Implementar chamada à API
    console.log('Carregando bairros...');
  }

  onSubmit() {
    if (this.bairro.id) {
      // Atualizar bairro existente
      console.log('Atualizando bairro:', this.bairro);
    } else {
      // Criar novo bairro
      console.log('Criando novo bairro:', this.bairro);
    }
    this.bairro = { nome: '' }; // Limpar formulário
  }

  editarBairro(bairro: Bairro) {
    this.bairro = { ...bairro };
  }

  deletarBairro(id?: number) {
    if (id && confirm('Tem certeza que deseja excluir este bairro?')) {
      console.log('Deletando bairro:', id);
    }
  }
} 