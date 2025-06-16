import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="menu-topo">
      <button class="btn" (click)="navegarPara('dashboard')">Início</button>
      <button class="btn" (click)="navegarPara('residuo')">Resíduos</button>
      <button class="btn btn-danger" (click)="logout()">Sair</button>
    </nav>
    <div class="container">
      <h1>Bem-vindo ao Sistema de Gerenciamento</h1>
      <p>Selecione uma opção no menu acima para navegar.</p>
    </div>
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
    .container {
      margin-top: 6rem;
      padding: 2rem;
      max-width: 900px;
      margin-left: auto;
      margin-right: auto;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      text-align: center;
    }
    h1 {
      color: #4CAF50;
      margin-bottom: 1rem;
    }
    p {
      color: #333;
      font-size: 1.2rem;
    }
  `]
})
export class DashboardComponent implements OnInit {
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
    this.router.navigate([`/${rota}`]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 