import { Pdv } from '../../models/Rede';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Entrie, FileInfo } from '../../models/FileInto';
import { viewerService } from '../../services/viewer/viewerService';
import { ToolbarComponent } from "../toolbar-component/toolbar-component";
import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule, ToolbarComponent],
  templateUrl: './viewerComponent.html',
  styleUrl: './viewerComponent.scss'
})
export class viewerComponent implements OnChanges {
  @Input() pdvSelecionado: Pdv | undefined;
  files: Entrie[] = [];
  fileInfo?: FileInfo;
  currentPath: string = ""
  selectedFile: Entrie | null = null;
  copiedFile: Entrie | null = null;
  creatingFolder: boolean = false;
  renamingFile: boolean = false;
  confirmingDelete: boolean = false;
  editFile: boolean = false;
  isLoading = false;
  newFolderName: string = '';
  renameFileName: string = '';
  fileContent: string = '';
  agent_adress: string = '';
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private viewerService: viewerService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pdvSelecionado'] && this.pdvSelecionado) {
      console.log('PDV selecionado:', this.pdvSelecionado);
      this.currentPath = "";
      this.newFolderName = '';
      this.renameFileName = '';
      this.agent_adress = this.pdvSelecionado.agent_adress;
      this.loadFiles('', this.agent_adress);
    }
  }

  onReload(agentAddress: string) {
    this.loadFiles(this.currentPath, agentAddress);
  }

  onCreateFolder() {
    this.creatingFolder = true;  // mostra input
    this.newFolderName = '';
  }

  confirmCreateFolder() {
    if (!this.newFolderName.trim()) {
      console.warn("Nome da pasta não pode ser vazio");
      return;
    }

    console.log("Criando pasta:", this.newFolderName, "em", this.currentPath);

    // Aqui você chama seu service
    this.viewerService.createFolder(
      this.currentPath, this.newFolderName, this.agent_adress
    ).subscribe({
      next: () => {
        this.creatingFolder = false;
        this.loadFiles(this.currentPath, this.agent_adress);
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
    this.viewerService.deleteFile(path, this.selectedFile.is_dir, this.agent_adress).subscribe({
      next: () => {
        console.log("Item deletado:", this.selectedFile?.name);
        this.loadFiles(this.currentPath, this.agent_adress);
        this.selectedFile = null;
        this.confirmingDelete = false;
      },
      error: (err) => console.error("Erro ao deletar:", err)
    });
  }

  cancelDelete() {
    this.confirmingDelete = false;
  }

  handleBack() {
    if (this.isRootPath(this.currentPath)) { //VERIFICANDO SE MEU PATH ESTÁ NA RAIZ DO WINDOWS
      return;
    }
    this.selectedFile = null;

    // Define separador baseado no sistema
    if (this.pdvSelecionado?.sistema === 'WINDOWS') {

      // normaliza (remove barras finais) e tira a última parte
      const normalized = this.currentPath.replace(/\\+$/, '');
      const parts = normalized.split('\\');
      parts.pop();

      const parent = parts.join('\\');
      this.currentPath = parent ? parent + '\\' : '';
    } else if (this.pdvSelecionado?.sistema === 'LINUX') {

      const normalized = this.currentPath.replace(/\/+$/, '');
      const parts = normalized.split('/');
      parts.pop();
      const parent = parts.join('/');
      this.currentPath = parent ? parent + '/' : '/';
    }

    this.loadFiles(this.currentPath, this.agent_adress);
  }

  onSelect(file: Entrie) {
    this.selectedFile = file;
    console.log("Selecionado:", file.name);
    console.log(this.selectedFile)
  }

  onOpen(file: Entrie) {
    if (file.is_dir) {
      this.loadFiles(file.path, this.agent_adress);
    } else if (file.ext = '.txt') {
      console.log('Abrindo arquivo txt');
      this.openFile(file.path, this.agent_adress);
    } else {
      console.log("Arquivo aberto:", file.name);
    }
  }

  loadFiles(path: string, agentAdress: string) {
    this.isLoading = true;
    this.viewerService.getFileInfo(path, agentAdress).subscribe({
      next: (data: FileInfo) => {
        this.fileInfo = data;
        this.files = data.entries;
        this.currentPath = this.fileInfo.path;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err)
        this.isLoading = false;
      }
    });
  }

  openFile(path: string, agentAddress: string) {
    this.isLoading = true;
    this.viewerService.openFile(path, agentAddress).subscribe({
      next: (res) => {
        if (res.status === "SUCCESS") {
          this.fileContent = res.content ?? '';

          this.isLoading = false;
          this.editFile = true;
        } else {
          this.isLoading = false;
          alert("Erro ao abrir arquivo: " + res.message);
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error("Erro na request", err);
        alert("Não foi possível abrir o arquivo.");
      }
    });
  }

  saveFile(path: string, fileContent: string) {
    if (fileContent) {
      this.editFile = true;
      console.log('salvando arquivo')
      this.viewerService.saveFile(path, fileContent, this.agent_adress).subscribe({
      });
    }
    this.editFile = false;
  }

  onRename() {
    if (!this.selectedFile) {
      console.warn("Nenhum arquivo selecionado para renomear");
      return;
    }

    this.renamingFile = true;

    this.renameFileName = this.selectedFile.name;
  }

  confirmRename() {
    if (!this.renameFileName || !this.selectedFile) return;

    this.viewerService.renameFile(this.selectedFile.path, this.renameFileName, this.agent_adress).subscribe({
      next: res => {
        console.log("Renomeado com sucesso:", res);
        this.loadFiles(this.currentPath, this.agent_adress);
      },
      error: err => console.error("Erro ao renomear:", err)
    });

    this.renamingFile = false;
    this.renameFileName = '';
  }

  cancelRename() {
    this.renamingFile = false;
    this.renameFileName = '';
  }

  toSend() {
    this.fileInput.nativeElement.value = '';
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {

    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log("Arquivo selecionado:", file);

      this.viewerService.uploadFile(file).subscribe({
        next: (url: string) => {
          console.log("Upload concluído:", url);

          console.log("Agent Address:", this.agent_adress);
          this.downloadFile(url, this.agent_adress);
        },
        error: err => console.error("Erro no upload:", err)
      });
    }
  }

  downloadFile(url: string, agentAddress: string) {
    this.isLoading = true;
    const path = this.currentPath;

    this.viewerService.downloadFile(path, url, agentAddress).subscribe({
      next: res => {
        console.log("Download concluído:", res);
        this.loadFiles(this.currentPath, agentAddress);
        this.isLoading = false;
      },
      error: err => {
        console.error("Erro no download:", err);
        this.isLoading = false;
      }
    });
  }

  onCopy() {
    if (!this.selectedFile) {
      console.warn("Nenhum arquivo ou pasta selecionada");
      return;
    }

    this.copiedFile = this.selectedFile;

    console.log("Copiado:", this.copiedFile);
  }

  onPaste() {
    if (!this.copiedFile) {
      console.warn("Nenhum arquivo copiado");
      return;
    }

    const oldPath = this.copiedFile.path;
    const name = this.copiedFile.name; //nome do arquivo
    const path = this.currentPath; // pasta onde vai colar

    this.viewerService.copyFile(path, name, oldPath, this.agent_adress).subscribe({
      next: res => {
        console.log("Arquivo colado com sucesso:", res);
        this.loadFiles(this.currentPath, this.agent_adress);
      },
      error: err => console.error("Erro ao colar arquivo:", err)
    });

    this.copiedFile = null;
  }

  getFileIcon(file: Entrie): string {
    if (file.is_dir) {
      // pasta
      return "https://img.icons8.com/?size=100&id=WWogVNJDSfZ5&format=png&color=000000";
    } else if (file.ext === ".txt" || (file.ext === "")) {
      // txt
      return "https://img.icons8.com/?size=100&id=2290&format=png&color=000000";
    } else if (file.ext === ".dll") {
      // dll
      return "https://img.icons8.com/?size=100&id=cUTCZjnuqrad&format=png&color=000000";
    } else {
      // qualquer outro tipo de arquivo
      return "https://img.icons8.com/?size=100&id=77615&format=png&color=000000";
    }
  }

  isRootPath(path: string): boolean {
    if (!path) return true;
    const normalized = path.replace(/\\+$/, '');
    return /^[A-Za-z]:$/.test(normalized);
  }
}

