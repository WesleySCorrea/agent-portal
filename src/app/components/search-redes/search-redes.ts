import { Page } from '../../models/Page';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Pdv, RedeDTO } from '../../models/Rede';
import { MercadoDTO } from '../../models/Mercado';
import { SearchService } from '../../services/search/search-service';
import { Component, EventEmitter, Output } from '@angular/core';

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
  redeSelecionada: RedeDTO | null = null;
  mercadoSelecionado: MercadoDTO | null = null;
  pdvSelecionado: Pdv | null = null;
  redes: RedeDTO[] = [];

  constructor(private searchService: SearchService) { }

  buscarRede() {
    if (!this.buscaRede) return;

    // chama o backend
    this.searchService.getRedesByName(this.buscaRede)
      .subscribe({
        next: (res: Page<RedeDTO>) => {
          console.log('Resposta do backend:', res);
          this.redes = res.content;
        },
        error: (err) => console.error('Erro ao buscar redes:', err)
      });
  }

  selecionarRede(rede: RedeDTO) {
    if (this.redeSelecionada === rede) {
      this.redeSelecionada = null;
      this.mercadoSelecionado = null;
      this.pdvSelecionado = null;
    } else {
      this.redeSelecionada = rede;
      this.mercadoSelecionado = null;
    }
  }

  selecionarMercado(mercado: MercadoDTO) {
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