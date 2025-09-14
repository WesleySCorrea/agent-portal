import { PdvDTO } from '../../models/Pdv';
import { viewerService } from '../../services/viewer/viewerService';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-update-command-component',
  imports: [],
  templateUrl: './update-command-component.html',
  styleUrl: './update-command-component.scss'
})
export class UpdateCommandComponent {
  @Output() updateClicked = new EventEmitter<void>();

  onUploadFile() {
    this.updateClicked.emit();
  }
}
