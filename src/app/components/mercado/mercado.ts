import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mercado',
  imports: [FormsModule],
  templateUrl: './mercado.html',
  styleUrl: './mercado.scss'
})
export class Mercado {
  idMercado: number | null = null;
  nomeMercado: string = '';
  cnpjMercado: string = '';
}
