import { Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { ResiduoComponent } from './pages/residuo/residuo.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [() => {
      const authService = inject(AuthService);
      return authService.isLoggedIn();
    }]
  },
  {
    path: 'residuo',
    component: ResiduoComponent,
    canActivate: [() => {
      const authService = inject(AuthService);
      return authService.isLoggedIn();
    }]
  },
  {
    path: 'bairro',
    loadComponent: () => import('./pages/bairro/bairro.component').then(m => m.BairroComponent),
    canActivate: [() => {
      const authService = inject(AuthService);
      return authService.isLoggedIn();
    }]
  },
  {
    path: 'caminhao',
    loadComponent: () => import('./pages/caminhao/caminhao.component').then(m => m.CaminhaoComponent),
    canActivate: [() => {
      const authService = inject(AuthService);
      return authService.isLoggedIn();
    }]
  },
  {
    path: 'ponto-coleta',
    loadComponent: () => import('./pages/ponto-coleta/ponto-coleta.component').then(m => m.PontoColetaComponent),
    canActivate: [() => {
      const authService = inject(AuthService);
      return authService.isLoggedIn();
    }]
  },
  {
    path: 'rota',
    loadComponent: () => import('./pages/rota/rota.component').then(m => m.RotaComponent),
    canActivate: [() => {
      const authService = inject(AuthService);
      return authService.isLoggedIn();
    }]
  },
  {
    path: 'usuario',
    loadComponent: () => import('./pages/usuario/usuario.component').then(m => m.UsuarioComponent),
    canActivate: [() => {
      const authService = inject(AuthService);
      return authService.isLoggedIn();
    }]
  },
  {
    path: '**',
    redirectTo: ''
  }
]; 