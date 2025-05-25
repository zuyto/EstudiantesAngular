import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, ProfesoresMateriaResponse } from '../Models/api-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private urlAPi: string;
  private ProfesorPorMateria: string;

  constructor(private http: HttpClient) {
    this.urlAPi = environment.urlApi;
    this.ProfesorPorMateria = environment.ProfesorPorMateria;
  }

  getByMateria(materiaId: number): Observable<ApiResponse<ProfesoresMateriaResponse>> {
    return this.http.post<ApiResponse<ProfesoresMateriaResponse>>(
      `${this.urlAPi + this.ProfesorPorMateria}/GetProfesorPorMateria`, materiaId);
  }
}
