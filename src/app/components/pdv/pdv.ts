import { Component, OnInit } from '@angular/core';
import { RedeDTO } from '../../models/Rede';
import { FormsModule } from '@angular/forms';
import { MercadoDTO } from '../../models/Mercado';
import { MercadoService } from '../../services/mercado/mercado-service';
import { RedeService } from '../../services/rede/rede-service';
import { CreatePdvDTO } from '../../models/Pdv';
import { PdvService } from '../../services/pdv/pdv-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pdv',
  imports: [CommonModule, FormsModule],
  templateUrl: './pdv.html',
  styleUrl: './pdv.scss'
})
export class Pdv implements OnInit {
  idPdv: number | null = null;
  apelidoPdv: string = '';
  agent_adress: string = '';
  sistema: string | null = null;
  versao: string = '';
  redes: RedeDTO[] = [];
  selectedRede: RedeDTO | null = null;
  mercados: MercadoDTO[] = [];
  selectedMercado: MercadoDTO | null = null;

  constructor(private redeService: RedeService, private pdvService: PdvService) { }

  ngOnInit(): void {
    this.loadRedes();
  }

  onSubmit() {
    if (!this.selectedMercado || this.selectedMercado.id == null || this.sistema == null) {
      alert('Selecione um mercado válido!');
      return;
    }

    const novoPdv: CreatePdvDTO = {
      pdv_name: this.apelidoPdv,
      agent_adress: this.agent_adress,
      sistema: this.sistema,
      versao: this.versao,
      mercado_id: this.selectedMercado?.id
    };

    this.pdvService.createPdv(novoPdv).subscribe({
      next: (response) => {
        this.idPdv = response.id,
          this.apelidoPdv = response.pdv_name,
          this.agent_adress = response.agent_adress,
          this.sistema = response.agent_adress,
          this.versao = response.agent_adress,
          alert('PDV cadastrado com sucesso!');
      },
      error: (err) => {
        alert('Erro ao cadastrar o PDV');
      }
    });
  }

  loadRedes() {
    this.redeService.loadRedesWithMercado().subscribe((redes) => {
      this.redes = redes;
    });
  }

  selectRede(redeDto: RedeDTO) {
    this.selectedRede = redeDto;
  }

  onClear() {
    this.selectedRede = null;
    // this.searchText = '';
    this.idPdv = null;
    this.apelidoPdv = '';
    this.agent_adress = '';
    this.sistema = null;
    this.versao = '';
    this.selectedRede = null;
    this.selectedMercado = null;
  }

  onRedeChange() {
    if (this.selectedRede) {
      this.mercados = this.selectedRede.mercados || [];
      this.selectedMercado = null;
    } else {
      this.mercados = [];
      this.selectedMercado = null;
    }
  }
}
