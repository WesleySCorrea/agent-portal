import { Page } from '../../models/Page';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Mercado, Pdv, Rede } from '../../models/Rede';
import { Component, EventEmitter, Output } from '@angular/core';
import { SearchService } from '../../services/search/search-service';

@Component({
  selector: 'app-search-redes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-redes.html',
  styleUrl: './search-redes.scss'
})
export class SearchRedes {

  @Output() pdvSelecionadoChange = new EventEmitter<Pdv>();

  buscaRede: string = '';
  redeSelecionada: Rede | null = null;
  mercadoSelecionado: Mercado | null = null;
  pdvSelecionado: Pdv | null = null;
  redes: Rede[] = [];

  constructor(private searchService: SearchService) { }

  buscarRede() {
    if (!this.buscaRede) return;

    // chama o backend
    this.searchService.getRedesByName(this.buscaRede)
      .subscribe({
        next: (res: Page<Rede>) => {
          console.log('Resposta do backend:', res);
          this.redes = res.content;
        },
        error: (err) => console.error('Erro ao buscar redes:', err)
      });
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
    this.pdvSelecionadoChange.emit(pdv);
  }
}