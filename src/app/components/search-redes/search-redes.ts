import { Page } from '../../models/Page';
import { PdvDTO } from '../../models/Pdv';
import { RedeDTO } from '../../models/Rede';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MercadoDTO } from '../../models/Mercado';
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

  @Output() pdvSelecionadoChange = new EventEmitter<PdvDTO>();

  buscaRede: string = '';
  redeSelecionada: RedeDTO | null = null;
  mercadoSelecionado: MercadoDTO | null = null;
  pdvSelecionado: PdvDTO | null = null;
  redes: RedeDTO[] = [];

  constructor(private searchService: SearchService) { }

  buscarRede() {
    if (!this.buscaRede) return;

    this.searchService.getRedesByName(this.buscaRede)
      .subscribe({
        next: (res: Page<RedeDTO>) => {
          this.redes = res.content;
        },
        error: (err) => {
          alert("Erro ao fazer a chamada no backend");
        }
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

  selecionarPdv(pdv: PdvDTO) {
    this.pdvSelecionado = pdv;
    this.pdvSelecionadoChange.emit(pdv);
  }
}