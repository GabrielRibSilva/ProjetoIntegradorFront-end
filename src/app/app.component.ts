import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenuComponent],
  template: `
    <ng-container *ngIf="authService.isAuthenticated(); else authPages">
      <app-menu></app-menu>
      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </ng-container>
    <ng-template #authPages>
      <main class="auth-content">
        <router-outlet></router-outlet>
      </main>
    </ng-template>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .content {
      flex: 1;
      padding: 2rem;
      background-color: #f5f5f5;
    }

    .auth-content {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f5f5f5;
    }
  `]
})
export class AppComponent {
  title = 'EcoRoute';

  constructor(public authService: AuthService) {}
} 