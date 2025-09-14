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
  usuario: string = 'Usuario';

  constructor(private router: Router) { }

  home() {
    this.router.navigate(['/home']);
  }

  cadastrar() {
    this.router.navigate(['/register']);;
  }

  sair() {
    this.router.navigate(['/login']);
  }

  upgrades() {
    this.router.navigate(['/upgrades']);
  }

  historico() {
    this.router.navigate(['/historico']);
  }
}
