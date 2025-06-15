import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="cadastro-container">
      <h2>Cadastro</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" [(ngModel)]="nome" name="nome" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" [(ngModel)]="email" name="email" required>
        </div>
        <div class="form-group">
          <label for="senha">Senha:</label>
          <input type="password" id="senha" [(ngModel)]="senha" name="senha" required>
        </div>
        <div class="form-group">
          <label for="confirmarSenha">Confirmar Senha:</label>
          <input type="password" id="confirmarSenha" [(ngModel)]="confirmarSenha" name="confirmarSenha" required>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  `,
  styles: [`
    .cadastro-container {
      max-width: 400px;
      margin: 0 auto;
      padding: 20px;
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
      width: 100%;
      padding: 10px;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #218838;
    }
  `]
})
export class CadastroComponent {
  nome: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';

  onSubmit() {
    if (this.senha !== this.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    // Implementar lógica de cadastro
    console.log('Cadastro:', { nome: this.nome, email: this.email, senha: this.senha });
  }
} 