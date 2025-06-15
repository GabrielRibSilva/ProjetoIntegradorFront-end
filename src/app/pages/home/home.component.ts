import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <header>
        <h1>EcoRoute</h1>
        <button class="btn btn-danger" (click)="logout()">Sair</button>
      </header>

      <nav class="menu">
        <a routerLink="/bairro" class="menu-item">
          <h2>Bairros</h2>
          <p>Gerenciar bairros e suas conexões</p>
        </a>

        <a routerLink="/caminhao" class="menu-item">
          <h2>Caminhões</h2>
          <p>Gerenciar frota de caminhões</p>
        </a>

        <a routerLink="/ponto-coleta" class="menu-item">
          <h2>Pontos de Coleta</h2>
          <p>Gerenciar pontos de coleta</p>
        </a>

        <a routerLink="/rota" class="menu-item">
          <h2>Rotas</h2>
          <p>Gerenciar rotas de coleta</p>
        </a>
      </nav>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .menu {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }
    .menu-item {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      text-decoration: none;
      color: inherit;
      transition: transform 0.2s;
    }
    .menu-item:hover {
      transform: translateY(-4px);
    }
    .btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-danger {
      background-color: #dc3545;
      color: white;
    }
  `]
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 