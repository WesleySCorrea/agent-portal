import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  email: string = '';
  password: string = '';

  constructor(private router: Router) { }

  entrar() {
    //Fazer a chamada na service e chamar a controler do backend
    if (this.email === 'admin@vrsoft.com' && this.password === '1234') {
      this.router.navigate(['/']); // Redireciona para Home
    } else {
      alert('Email ou senha incorretos!');
    }
  }
}
