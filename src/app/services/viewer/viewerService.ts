import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FileInfo } from '../../models/FileInto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class viewerService {
  private agentUrl = 'http://localhost:8080/api/agent'

  constructor(private http: HttpClient) { }

  getFileInfo(path: string, agentAddress: string): Observable<FileInfo> {
    return this.http.get<FileInfo>(`${this.agentUrl}/list`, {
      params: { path, agentAddress }
    });
  }

  openFile(path: string, agentAddress: string): Observable<FileInfo> {
    return this.http.post<FileInfo>(`${this.agentUrl}/open`,
      { path, agentAddress }
    );
  }

  saveFile(path: string, content: string, agentAddress: string): Observable<FileInfo> {
    return this.http.post<FileInfo>(`${this.agentUrl}/save`,
      { path, content, agentAddress }
    );
  }

  createFolder(path: string, name: string, agentAddress: string): Observable<FileInfo> {
    return this.http.post<FileInfo>(`${this.agentUrl}/create`,
      { path, name, agentAddress }
    );
  }

  deleteFile(path: string, is_dir: boolean, agentAddress: string): Observable<FileInfo> {
    console.log(path)
    return this.http.post<FileInfo>(`${this.agentUrl}/delete`,
      { path, agentAddress }
    );
  }

  downloadFile(path: string, url: string, agentAddress: string): Observable<FileInfo> {
    return this.http.post<FileInfo>(`${this.agentUrl}/download`,
      { path, url, agentAddress }
    );
  }

  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.agentUrl}/upload`,
      formData, { responseType: 'text' });
  }

  copyFile(path: string, name: string, oldPath: string, agentAddress: string): Observable<FileInfo> {
    return this.http.post<FileInfo>(`${this.agentUrl}/copy`,
      { path, oldPath, agentAddress }
    );
  }

  renameFile(path: string, name: string, agentAddress: string): Observable<FileInfo> {
    return this.http.post<FileInfo>(`${this.agentUrl}/rename`,
      { path, name, agentAddress }
    );
  }

  upgradeListPdv(url: string, agent_addresses: string[]): Observable<unknown> {
    return this.http.post<FileInfo>(`${this.agentUrl}/list-download`,
      { url, agent_addresses }
    );
  }
}