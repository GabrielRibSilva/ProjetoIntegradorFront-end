import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PontoColetaComponent } from './ponto-coleta/ponto-coleta.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'ponto-coleta', component: PontoColetaComponent }
    ])
  ]
})
export class PagesModule { } 