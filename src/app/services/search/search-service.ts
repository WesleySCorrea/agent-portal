import { Observable } from 'rxjs';
import { Page } from '../../models/Page';
import { Injectable } from '@angular/core';
import { RedeDTO } from '../../models/Rede';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getRedesByName(rede: string): Observable<Page<RedeDTO>> {
    const url = `${this.baseUrl}/rede/${rede}`;
    return this.http.get<Page<RedeDTO>>(url);
  }
}
