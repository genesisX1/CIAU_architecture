import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MediaFile } from '../models/media-file.model';

@Injectable({
  providedIn: 'root'
})
export class MediaFileService {
  private apiUrl = 'http://localhost:8000/medias'; // adapte selon ton backend

  constructor(private http: HttpClient) {}

  getAllMedia(): Observable<MediaFile[]> {
    return this.http.get<MediaFile[]>(this.apiUrl);
  }

  getMediaByProject(projectId: number): Observable<MediaFile[]> {
    return this.http.get<MediaFile[]>(`${this.apiUrl}?portfolio_project=${projectId}`);
  }

  uploadMedia(formData: FormData): Observable<MediaFile> {
    return this.http.post<MediaFile>(this.apiUrl, formData);
  }

  deleteMedia(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
