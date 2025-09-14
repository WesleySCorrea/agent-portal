import { RedeDTO } from '../../models/Rede';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CreateMercadoDTO } from '../../models/Mercado';
import { allowOnlyNumbers } from '../../utils/validador';
import { RedeService } from '../../services/rede/rede-service';
import { MercadoService } from '../../services/mercado/mercado-service';

@Component({
  selector: 'app-mercado',
  imports: [FormsModule, CommonModule],
  templateUrl: './mercado.html',
  styleUrl: './mercado.scss'
})
export class Mercado implements OnInit {
  redes: RedeDTO[] = [];
  selectedRede: RedeDTO | null = null;
  searchText: string = '';
  idMercado: number | null = null;
  nomeMercado: string = '';
  cnpjMercado: string = '';

  constructor(private redeService: RedeService, private mercadoService: MercadoService) { }

  ngOnInit(): void {
    this.loadRedes();
  }

  onSubmit() {
    if (!this.selectedRede || this.selectedRede.id == null) {
      alert('Selecione uma rede válida!');
      return;
    }

    const novoMercado: CreateMercadoDTO = {
      mercado: this.nomeMercado,
      cnpj: this.cnpjMercado,
      rede_id: this.selectedRede?.id
    };

    this.mercadoService.createMercado(novoMercado).subscribe({
      next: (response) => {
        this.idMercado = response.id,
          this.nomeMercado = response.mercado,
          this.cnpjMercado = response.cnpj,
          alert('Mercado cadastrado com sucesso!');
      },
      error: (err) => {
        alert('Erro ao cadastrar mercado');
      }
    });
  }

  loadRedes() {
    this.redeService.loadRedes().subscribe((redes) => {
      this.redes = redes;
    });
  }

  selectRede(redeDto: RedeDTO) {
    this.selectedRede = redeDto;
    this.searchText = redeDto.rede;
  }

  onClear() {
    this.selectedRede = null;
    this.searchText = '';
    this.idMercado = null;
    this.nomeMercado = '';
    this.cnpjMercado = '';
  }

  onKeyPress(event: KeyboardEvent) {
    allowOnlyNumbers(event);
  }
}
