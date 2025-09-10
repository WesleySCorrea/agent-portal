import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Navbar } from "./components/navbar/navbar";
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  mostrarNavbar = true;

  protected readonly title = signal('agent-portal');

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.mostrarNavbar = event.url !== '/login';
      });
  }
}
