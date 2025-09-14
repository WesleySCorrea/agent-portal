import { firstValueFrom } from "rxjs";
import { PdvDTO } from "../../models/Pdv";
import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { viewerService } from "../../services/viewer/viewerService";

@Component({
  selector: 'app-update-component',
  imports: [CommonModule],
  templateUrl: './update-component.html',
  styleUrl: './update-component.scss'
})
export class UpdateComponent {
  @Input() pdvsSelecionados: PdvDTO[] = [];

  constructor(private viewerService: viewerService) { }

  removePdv(pdv: PdvDTO) {
    this.pdvsSelecionados = this.pdvsSelecionados.filter(p => p !== pdv);
  }

  atualizarPdvs() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';

    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      if (!file) return;

      this.viewerService.uploadFile(file).subscribe({
        next: async (url: string) => {

          const arquivoUrl = url;
          await this.sendPdvsToBackend(url, this.pdvsSelecionados)
        },
        error: (err) => console.error('Erro no upload:', err)
      });
    };

    fileInput.click();
  }

  async sendPdvsToBackend(url: string, pdvs: PdvDTO[]) {
    try {
      const agentAddresses: string[] = pdvs.map(p => p.agent_adress);

      await firstValueFrom(this.viewerService.upgradeListPdv(url, agentAddresses));
      console.log('Requisição enviada para o backend com sucesso!');
    } catch (err) {
      console.error('Erro ao enviar lista de PDVs:', err);
    }
  }
}
