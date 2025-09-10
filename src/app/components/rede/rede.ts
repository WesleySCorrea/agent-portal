import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rede',
  imports: [FormsModule],
  templateUrl: './rede.html',
  styleUrl: './rede.scss'
})
export class Rede {
  nomeRede: string = '';
  idRede: number | null = null;
  cnpjRede: string = '';
}
