import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRedes } from "../../components/search-redes/search-redes";
import { viewerComponent } from '../../components/viewerComponent/viewerComponent';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [viewerComponent, SearchRedes, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  pdvSelecionado?: string;
}
