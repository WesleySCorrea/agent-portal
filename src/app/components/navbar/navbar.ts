import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

  usuario: string = 'Usuário';

  constructor(private router: Router) { }

  home() {
    this.router.navigate(['/home']);
  }
  cadastrar() {
    this.router.navigate(['/register']);;
  }
  sair() {
    // Deslogar e reenviar para login
    this.router.navigate(['/login']);
  }
  abrirConfiguracoes() {
    console.log('Abrir configurações');
  }
}
