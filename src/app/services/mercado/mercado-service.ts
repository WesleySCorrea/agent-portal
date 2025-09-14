import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateMercadoDTO, MercadoDTO } from '../../models/Mercado';

@Injectable({
  providedIn: 'root'
})
export class MercadoService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  createMercado(rede: CreateMercadoDTO): Observable<MercadoDTO> {
    const url = `${this.baseUrl}/mercado`;
    return this.http.post<MercadoDTO>(url, rede);
  }
}
