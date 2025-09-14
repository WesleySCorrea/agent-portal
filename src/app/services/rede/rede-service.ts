import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateRedeDTO, RedeDTO } from '../../models/Rede';

@Injectable({
  providedIn: 'root'
})
export class RedeService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  loadRedes(): Observable<RedeDTO[]> {
    const url = `${this.baseUrl}/rede`;
    return this.http.get<RedeDTO[]>(url);
  }

  loadRedesWithMercado(): Observable<RedeDTO[]> {
    const url = `${this.baseUrl}/rede/mercado`;
    return this.http.get<RedeDTO[]>(url);
  }

  createRede(rede: CreateRedeDTO): Observable<RedeDTO> {
    const url = `${this.baseUrl}/rede`;
    return this.http.post<RedeDTO>(url, rede);
  }
}
