import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Cadastro } from './components/cadastro/cadastro';
import { Bairro } from './components/bairro/bairro';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, Login, Cadastro, Bairro], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'front-pi';
}
