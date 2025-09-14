import { Home } from './page/home/home';
import { Routes } from '@angular/router';
import { Login } from './page/login/login';
import { Update } from './page/update/update';
import { Register } from './page/register/register';
import { History } from './page/history/history';
import { UpdateComponent } from './components/update-component/update-component';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'upgrades', component: Update },
    { path: 'historico', component: History },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
