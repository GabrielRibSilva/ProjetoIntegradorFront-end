import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="container">
        <h1>EcoRoute - Sistema de Gerenciamento de Coleta</h1>
        <div class="nav-links">
          <a routerLink="/home" routerLinkActive="active">Home</a>
          <a routerLink="/bairro" routerLinkActive="active">Bairros</a>
          <a routerLink="/caminhao" routerLinkActive="active">Caminhões</a>
          <a routerLink="/ponto-coleta" routerLinkActive="active">Pontos de Coleta</a>
          <a routerLink="/rota" routerLinkActive="active">Rotas</a>
          <a routerLink="/rua-conexao" routerLinkActive="active">Ruas Conexões</a>
          <a routerLink="/itinerario" routerLinkActive="active">Itinerários</a>
          <a routerLink="/auditoria" routerLinkActive="active">Auditoria</a>
          <button class="btn-logout" (click)="logout()">Sair</button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background-color: #4CAF50;
      color: white;
      padding: 1rem 0;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    h1 {
      margin: 0;
      font-size: 1.5rem;
    }

    .nav-links {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }

    a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.2s;
    }

    a:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    a.active {
      background-color: rgba(255, 255, 255, 0.2);
    }

    .btn-logout {
      background-color: #dc3545;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .btn-logout:hover {
      background-color: #c82333;
    }
  `]
})
export class MenuComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
} 