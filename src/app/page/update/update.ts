import { PdvDTO } from '../../models/Pdv';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchRedes } from "../../components/search-redes/search-redes";
import { UpdateComponent } from "../../components/update-component/update-component";
import { UpdateCommandComponent } from "../../components/update-command-component/update-command-component";

@Component({
  selector: 'app-update',
  imports: [UpdateComponent, SearchRedes, UpdateCommandComponent],
  templateUrl: './update.html',
  styleUrl: './update.scss'
})
export class Update {
  pdvsSelecionados: PdvDTO[] = [];

  adicionarPdv(pdv: PdvDTO) {
    const index = this.pdvsSelecionados.findIndex(p => p.id === pdv.id);
    if (index >= 0) {
      this.pdvsSelecionados = this.pdvsSelecionados.filter(p => p.id !== pdv.id);
    } else {
      this.pdvsSelecionados = [...this.pdvsSelecionados, pdv];
    }
  }
}
