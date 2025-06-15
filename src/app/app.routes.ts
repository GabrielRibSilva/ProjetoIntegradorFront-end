import { Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'registro',
    loadComponent: () => import('./pages/registro/registro.component').then(m => m.RegistroComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    canActivate: [() => {
      const authService = inject(AuthService);
      return authService.isAuthenticated();
    }]
  },
  {
    path: 'bairro',
    loadComponent: () => import('./pages/bairro/bairro.component').then(m => m.BairroComponent),
    canActivate: [() => {
      const authService = inject(AuthService);
      return authService.isAuthenticated();
    }]
  },
  {
    path: 'caminhao',
    loadComponent: () => import('./pages/caminhao/caminhao.component').then(m => m.CaminhaoComponent),
    canActivate: [() => {
      const authService = inject(AuthService);
      return authService.isAuthenticated();
    }]
  },
  {
    path: 'ponto-coleta',
    loadComponent: () => import('./pages/ponto-coleta/ponto-coleta.component').then(m => m.PontoColetaComponent),
    canActivate: [() => {
      const authService = inject(AuthService);
      return authService.isAuthenticated();
    }]
  },
  {
    path: 'rota',
    loadComponent: () => import('./pages/rota/rota.component').then(m => m.RotaComponent),
    canActivate: [() => {
      const authService = inject(AuthService);
      return authService.isAuthenticated();
    }]
  },
  {
    path: 'rua-conexao',
    loadComponent: () => import('./pages/rua-conexao/rua-conexao.component').then(m => m.RuaConexaoComponent),
    canActivate: [() => {
      const authService = inject(AuthService);
      return authService.isAuthenticated();
    }]
  },
  {
    path: 'itinerario',
    loadComponent: () => import('./pages/itinerario/itinerario.component').then(m => m.ItinerarioComponent),
    canActivate: [() => {
      const authService = inject(AuthService);
      return authService.isAuthenticated();
    }]
  },
  {
    path: 'auditoria',
    loadComponent: () => import('./pages/auditoria/auditoria.component').then(m => m.AuditoriaComponent),
    canActivate: [() => {
      const authService = inject(AuthService);
      return authService.isAuthenticated();
    }]
  },
  {
    path: '**',
    redirectTo: ''
  }
]; 