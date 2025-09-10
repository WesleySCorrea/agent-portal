import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pdv',
  imports: [FormsModule],
  templateUrl: './pdv.html',
  styleUrl: './pdv.scss'
})
export class Pdv {
  idPdv: number | null = null;
  apelidoPdv: string = '';
  enderecoPdv: string = '';
}
