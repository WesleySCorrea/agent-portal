import { Observable } from 'rxjs';
import { Rede } from '../../models/Rede';
import { Page } from '../../models/Page';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getRedesByName(rede: string): Observable<Page<Rede>> {
    const url = `${this.baseUrl}/rede/${rede}`;
    return this.http.get<Page<Rede>>(url);
  }
}
