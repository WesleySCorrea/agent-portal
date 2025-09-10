import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FileInfo } from '../models/FileInto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class viewerService {
  private baseUrl = 'http://localhost:8080/send/rpc';

  constructor(private http: HttpClient) { }

  getFileInfo(path: string): Observable<FileInfo> {
    const comand = 'ls';
    return this.http.get<FileInfo>(`${this.baseUrl}`, {
      params: { path, comand }
    });
  }

  createFolder(path: string, name: string): Observable<FileInfo> {
    const comand = 'mkdir';
    return this.http.get<FileInfo>(`${this.baseUrl}`, {
      params: { path, comand, name }
    });
  }

  deleteFile(path: string, is_dir: boolean): Observable<FileInfo> {
    const comand = 'rm'
    console.log(path)
    return this.http.get<FileInfo>(`${this.baseUrl}`, {
      params: { path, comand }
    });
  }
}