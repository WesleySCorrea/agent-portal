import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateRedeDTO, RedeDTO } from '../../models/RedeModel';

@Injectable({
  providedIn: 'root'
})
export class RedeService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  createRede(rede: CreateRedeDTO): Observable<RedeDTO> {
    const url = `${this.baseUrl}/rede`;
    return this.http.post<RedeDTO>(url, rede);
  }
}
