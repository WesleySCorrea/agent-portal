import { Home } from './page/home/home';
import { Routes } from '@angular/router';
import { Login } from './page/login/login';
import { Register } from './page/register/register';
import { UpdateComponent } from './components/update-component/update-component';
import { Update } from './page/update/update';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'updates', component: Update },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
