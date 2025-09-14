import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreatePdvDTO, PdvDTO } from '../../models/Pdv';

@Injectable({
  providedIn: 'root'
})
export class PdvService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  createPdv(pdv: CreatePdvDTO): Observable<PdvDTO> {
    const url = `${this.baseUrl}/pdv`;
    return this.http.post<PdvDTO>(url, pdv);
  }
}
