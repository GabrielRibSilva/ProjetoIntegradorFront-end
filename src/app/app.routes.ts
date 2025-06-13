import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Cadastro } from './components/cadastro/cadastro';
import { Bairro } from './components/bairro/bairro';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        title: 'Home'
    },
    {
        path: 'home',
        component: Home,
        title: 'Home'
    },
    {
        path: 'login',
        component: Login,
        title: 'Login'
    },
    {
        path: 'cadastro',
        component: Cadastro,
        title: 'Cadastro'
    },
    {
        path: 'bairros',
        component: Bairro,
        title: 'Bairros'
    },

];
