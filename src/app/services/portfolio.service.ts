// src/app/services/portfolio.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

// Modèle de ton projet
export interface PortfolioProject {
  id?: number;
  title: string;
  description: string;
  image: string;
  created_at?: string;

  owner_name: string;
  year: number;
  surface_area: string;
  project_status: string;
  mission: string;
  budget: string;
  objectifs: string;
  approach: string;
  image_1?: string;
  image_2?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl = 'http://localhost:8000/portfolio'; // Modifie si besoin selon ton back

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<PortfolioProject[]> {
    return this.http.get<PortfolioProject[]>(this.apiUrl);
  }

  getProjectById(id: number): Observable<PortfolioProject> {
    return this.http.get<PortfolioProject>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError(() => new Error('Projet introuvable.'));
        }
        return throwError(() => new Error('Une erreur est survenue.'));
      })
    );
  }

  createProject(project: PortfolioProject): Observable<PortfolioProject> {
    return this.http.post<PortfolioProject>(this.apiUrl, project);
  }

  updateProject(id: number, project: PortfolioProject): Observable<PortfolioProject> {
    return this.http.put<PortfolioProject>(`${this.apiUrl}/${id}`, project);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
