import { Component } from '@angular/core';
import { Pdv } from "../../components/pdv/pdv";
import { CommonModule } from '@angular/common';
import { Rede } from "../../components/rede/rede";
import { Mercado } from "../../components/mercado/mercado";

@Component({
  selector: 'app-register',
  imports: [Rede, Mercado, Pdv, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  tipoCadastro: 'rede' | 'mercado' | 'pdv' = 'rede';

  abrirCadastro(tipo: 'rede' | 'mercado' | 'pdv') {
    this.tipoCadastro = tipo;
  }
}
