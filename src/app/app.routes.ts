import { Home } from './page/home/home';
import { Routes } from '@angular/router';
import { Login } from './page/login/login';
import { Register } from './page/register/register';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
