import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { allowOnlyNumbers } from '../../utils/validador';
import { CreateRedeDTO, RedeDTO } from '../../models/Rede';
import { RedeService } from '../../services/rede/rede-service';

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

  constructor(private redeService: RedeService) { }

  onSubmit() {
    const novaRede: CreateRedeDTO = {
      rede: this.nomeRede,
      cnpj: this.cnpjRede,
    };

    this.redeService.createRede(novaRede).subscribe({
      next: (response) => {
        this.idRede = response.id,
          this.nomeRede = response.rede,
          this.cnpjRede = response.cnpj,
          console.log('Rede cadastrada com sucesso:', response);
        alert('Rede cadastrada com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao cadastrar rede:', err);
        alert('Erro ao cadastrar rede');
      }
    });
  }

  onClear() {
    this.idRede = null;
    this.nomeRede = '';
    this.cnpjRede = '';
  }

  onKeyPress(event: KeyboardEvent) {
    allowOnlyNumbers(event);
  }
}
