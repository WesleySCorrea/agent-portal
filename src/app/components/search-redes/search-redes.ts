import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';

interface Pdv {
  nome: string;
}
interface Mercado {
  nome: string;
  pdvs: Pdv[];
}
interface Rede {
  nome: string;
  mercados: Mercado[];
}

@Component({
  selector: 'app-search-redes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-redes.html',
  styleUrl: './search-redes.scss'
})
export class SearchRedes {

  @Output() pdvSelecionadoChange = new EventEmitter<string>(); // envia o nome ou id do PDV

  buscaRede: string = '';
  redeSelecionada: Rede | null = null;
  mercadoSelecionado: Mercado | null = null;
  pdvSelecionado: Pdv | null = null;
  redes: Rede[] = [
    { nome: 'Rede 1', mercados: [{ nome: 'Mercado A', pdvs: [{ nome: 'PDV 1' }, { nome: 'PDV 2' }] }] },
    { nome: 'Rede 2', mercados: [{ nome: 'Mercado B', pdvs: [{ nome: 'PDV 3' }] }] }
  ];

  buscarRede() {
    console.log('Buscando rede:', this.buscaRede);
  }

  selecionarRede(rede: any) {
    if (this.redeSelecionada === rede) {
      this.redeSelecionada = null;
      this.mercadoSelecionado = null;
      this.pdvSelecionado = null;
    } else {
      this.redeSelecionada = rede;
      this.mercadoSelecionado = null;
    }
  }

  selecionarMercado(mercado: any) {
    if (this.mercadoSelecionado === mercado) {
      this.mercadoSelecionado = null;
      this.pdvSelecionado = null;
    } else {
      this.mercadoSelecionado = mercado;
      this.pdvSelecionado = null;
    }
  }

  selecionarPdv(pdv: Pdv) {
    this.pdvSelecionado = pdv;
    this.pdvSelecionadoChange.emit(pdv.nome);
  }
}