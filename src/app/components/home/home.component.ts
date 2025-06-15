import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div>
      <h1>Bem-vindo ao Ecoroute</h1>
      <p>Sistema de gerenciamento de rotas sustentáveis</p>
    </div>
  `,
  styles: [`
    div {
      padding: 20px;
      text-align: center;
    }
  `]
})
export class HomeComponent {} 