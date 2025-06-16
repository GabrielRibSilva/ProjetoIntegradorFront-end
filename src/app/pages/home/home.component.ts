import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Bem-vindo ao EcoRoute</h1>
      <div class="menu">
        <button (click)="navegarPara('bairro')">Gerenciar Bairros</button>
        <button (click)="navegarPara('caminhao')">Gerenciar Caminhões</button>
        <button (click)="navegarPara('ponto-coleta')">Gerenciar Pontos de Coleta</button>
        <button (click)="navegarPara('rota')">Gerenciar Rotas</button>
        <button (click)="navegarPara('usuario')">Gerenciar Usuários</button>
        <button (click)="logout()">Sair</button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    h1 {
      color: #4CAF50;
      text-align: center;
      margin-bottom: 2rem;
    }
    .menu {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }
    button {
      padding: 1rem;
      border: none;
      border-radius: 4px;
      background-color: #4CAF50;
      color: white;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    button:hover {
      background-color: #45a049;
    }
  `]
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  navegarPara(rota: string): void {
    this.router.navigate([rota]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 