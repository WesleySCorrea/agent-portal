import { CommonModule } from '@angular/common';
import { Entrie, FileInfo } from '../../models/FileInto';
import { viewerService } from '../../services/viewerService';
import { ToolbarComponent } from "../toolbar-component/toolbar-component";
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule, ToolbarComponent],
  templateUrl: './viewerComponent.html',
  styleUrl: './viewerComponent.scss'
})
export class viewerComponent implements OnChanges {
  @Input() pdvNome?: string;
  files: Entrie[] = [];
  fileInfo?: FileInfo;
  currentPath: string = ""
  selectedFile: Entrie | null = null;
  creatingFolder: boolean = false;
  confirmingDelete: boolean = false;
  newFolderName: string = '';

  constructor(private viewerService: viewerService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pdvNome'] && this.pdvNome) {
      console.log('PDV selecionado:', this.pdvNome);
      this.loadFiles('');
    }
  }

  onCreateFolder() {
    this.creatingFolder = true;  // mostra input
    this.newFolderName = '';
  }

  confirmCreateFolder() {
    if (this.isRootPath(this.currentPath)) {
      console.warn("Não é permitido criar pasta na raiz do drive");
      alert("Você não pode criar pastas diretamente na raiz."); // opcional
      return;
    }

    if (!this.newFolderName.trim()) {
      console.warn("Nome da pasta não pode ser vazio");
      return;
    }

    console.log("Criando pasta:", this.newFolderName, "em", this.currentPath);

    // Aqui você chama seu service
    this.viewerService.createFolder(
      this.currentPath, this.newFolderName
    ).subscribe({
      next: () => {
        this.creatingFolder = false;
        this.loadFiles(this.currentPath);
      },
      error: (err) => console.error(err)
    });
  }

  cancelCreateFolder() {
    this.creatingFolder = false;
    this.newFolderName = '';
  }

  onDeleteSelected() {
    if (!this.selectedFile) {
      alert("Nenhum arquivo ou pasta selecionado!");
      return;
    }

    if (this.isRootPath(this.selectedFile.path)) {
      alert("Não é permitido deletar a raiz do drive!");
      return;
    }

    this.confirmingDelete = true;
  }

  confirmDelete() {
    if (!this.selectedFile) return;
    const path = this.selectedFile.path;

    console.log(path)

    // Chama o serviço para deletar
    this.viewerService.deleteFile(path, this.selectedFile.is_dir).subscribe({
      next: () => {
        console.log("Item deletado:", this.selectedFile?.name);
        this.loadFiles(this.currentPath);
        this.selectedFile = null;
        this.confirmingDelete = false;
      },
      error: (err) => console.error("Erro ao deletar:", err)
    });
  }

  cancelDelete() {
    this.confirmingDelete = false; // fecha o modal
  }

  handleBack() {
    if (this.isRootPath(this.currentPath)) { //VERIFICANDO SE MEU PATH ESTÁ NA RAIZ
      return;
    }

    // normaliza (remove barras finais) e tira a última parte
    const normalized = this.currentPath.replace(/\\+$/, '');
    const parts = normalized.split('\\');
    parts.pop(); // remove a última pasta

    // monta o novo path (adiciona backslash no fim se houver algo)
    const parent = parts.join('\\');
    this.currentPath = parent ? parent + '\\' : '';

    // recarrega a pasta pai
    this.loadFiles(this.currentPath);
  }

  onSelect(file: Entrie) {
    this.selectedFile = file;
    console.log("Selecionado:", file.name);
  }

  onOpen(file: Entrie) {
    if (file.is_dir) {
      this.loadFiles(file.path);
    } else {
      console.log("Arquivo aberto:", file.name);
    }
  }

  loadFiles(path: string) {
    // aqui você passa o PDV para o backend se quiser
    this.viewerService.getFileInfo(path).subscribe({
      next: (data: FileInfo) => {
        this.fileInfo = data;
        this.files = data.entries;
        this.currentPath = this.fileInfo.path;
      },
      error: (err) => console.error(err)
    });
  }

  getFileIcon(file: Entrie): string {
    if (file.is_dir || file.ext === "") {
      // pasta
      return "https://img.icons8.com/?size=100&id=WWogVNJDSfZ5&format=png&color=000000";
    } else if (file.ext === ".txt") {
      // txt
      return "https://img.icons8.com/?size=100&id=2290&format=png&color=000000";
    } else if (file.ext === ".dll") {
      // dll
      return "https://img.icons8.com/?size=100&id=cUTCZjnuqrad&format=png&color=000000";
    } else {
      // qualquer outro tipo de arquivo
      return "https://img.icons8.com/?size=100&id=placeholder&format=png&color=000000";
    }
  }

  isRootPath(path: string): boolean {
    if (!path) return true;
    const normalized = path.replace(/\\+$/, '');
    return /^[A-Za-z]:$/.test(normalized);
  }
}

