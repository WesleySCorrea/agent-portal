import { Component, Input, Output, EventEmitter, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toolbar-component.html',
  styleUrl: './toolbar-component.scss',
})
export class ToolbarComponent {
  @Input({ required: true }) currentPath: string | null = '';
  @Input() parentPath: string | null = null;
  @Output() back = new EventEmitter<void>();
  @Output() createFolder = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() copy = new EventEmitter<void>();
  @Output() paste = new EventEmitter<void>();

  constructor() { }

  hasParentPath() {
    return this.parentPath !== null && this.parentPath !== '';
  }

  onBack() {
    this.back.emit();
  }

  onCreateFolder() {
    this.createFolder.emit();
  }

  onDelete() {
    this.delete.emit();
  }

  onCopy() {
    this.copy.emit();
  }

  onPaste() {
    this.paste.emit();
  }

  isRoot(): boolean {
    const p = (this.currentPath ?? '').replace(/\\+$/, '');
    return p === '' || /^[A-Za-z]:$/.test(p);
  }
}
