import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FileInfo } from '../../models/FileInto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class viewerService {
  private baseUrl = 'http://localhost:8080/send/rpc';

  constructor(private http: HttpClient) { }

  getFileInfo(path: string, agentAddress: string): Observable<FileInfo> {
    const comand = 'ls';
    return this.http.get<FileInfo>(`${this.baseUrl}`, {
      params: { path, comand, agentAddress }
    });
  }

  openFile(path: string, agentAddress: string): Observable<FileInfo> {
    const comand = 'open';
    return this.http.get<FileInfo>(`${this.baseUrl}`, {
      params: { path, comand, agentAddress }
    });
  }

  saveFile(path: string, content: string, agentAddress: string): Observable<FileInfo> {
    const comand = 'save';
    return this.http.get<FileInfo>(`${this.baseUrl}`, {
      params: { path, comand, content, agentAddress }
    });
  }

  createFolder(path: string, name: string, agentAddress: string): Observable<FileInfo> {
    const comand = 'mkdir';
    return this.http.get<FileInfo>(`${this.baseUrl}`, {
      params: { path, comand, name, agentAddress }
    });
  }

  deleteFile(path: string, is_dir: boolean, agentAddress: string): Observable<FileInfo> {
    const comand = 'rm'
    console.log(path)
    return this.http.get<FileInfo>(`${this.baseUrl}`, {
      params: { path, comand, agentAddress }
    });
  }

  downloadFile(path: string, url: string, agentAddress: string): Observable<FileInfo> {
    const comand = 'down';
    return this.http.get<FileInfo>(`${this.baseUrl}`, {
      params: { path, comand, url, agentAddress }
    });
  }

  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/upload`, formData, { responseType: 'text' });
  }

  copyFile(path: string, name: string, oldPath: string, agentAddress: string): Observable<FileInfo> {
    const comand = 'copy';
    return this.http.get<FileInfo>(`${this.baseUrl}`, {
      params: { path, comand, oldPath, agentAddress }
    });
  }

  renameFile(path: string, name: string, agentAddress: string): Observable<FileInfo> {
    const comand = 'rename';
    return this.http.get<FileInfo>(`${this.baseUrl}`, {
      params: { path, comand, name, agentAddress }
    });
  }
}