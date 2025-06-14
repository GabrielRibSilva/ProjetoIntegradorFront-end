import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="menu-topo" *ngIf="authService.isLoggedIn()">
      <button class="btn" (click)="navegarPara('home')">Início</button>
      <button class="btn" (click)="navegarPara('ponto-coleta')">Pontos de Coleta</button>
      <button class="btn" (click)="navegarPara('caminhao')">Caminhões</button>
      <button class="btn" (click)="navegarPara('rota')">Rotas</button>
      <button class="btn" (click)="navegarPara('itinerario')">Itinerários</button>
      <button class="btn" (click)="navegarPara('cronograma')">Cronograma</button>
      <button class="btn" (click)="navegarPara('consulta')">Consultas</button>
      <button class="btn" (click)="navegarPara('residuo')">Resíduos</button>
      <button class="btn btn-danger" (click)="logout()">Sair</button>
    </nav>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .menu-topo {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      background: #4CAF50;
      display: flex;
      gap: 1rem;
      padding: 1rem 2rem;
      z-index: 1000;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .btn {
      background: transparent;
      color: #fff;
      border: none;
      font-size: 1.1rem;
      padding: 0.5rem 1.5rem;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn:hover {
      background: rgba(255,255,255,0.15);
    }
    .btn-danger {
      background: #dc3545;
      color: #fff;
    }
    .btn-danger:hover {
      background: #c82333;
    }
    main {
      margin-top: 6rem;
      padding: 2rem;
    }
  `]
})
export class AppComponent {
  constructor(public authService: AuthService, public router: Router) {}

  navegarPara(rota: string): void {
    this.router.navigate([`/${rota}`]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 