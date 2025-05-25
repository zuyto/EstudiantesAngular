import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EStudianteCreate, } from '../Models/estudiante.model';
import { ApiResponse, CompanerosResponse, EstudianteDetalleResponse, EstudiantesResponse } from '../Models/api-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private urlAPi: string;
  private EstudianteTodos: string;
  private EstudiantesPorId: string;
  private EstudianteRegistrar: string;
  private CompanerosTodos: string;
  private EstudianteActualizar: string;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {
    this.urlAPi = environment.urlApi;
    this.EstudianteTodos = environment.EstudianteTodos;
    this.EstudiantesPorId = environment.EstudiantesPorId;
    this.EstudianteRegistrar = environment.EstudianteRegistrar;
    this.CompanerosTodos = environment.CompanerosTodos;
    this.EstudianteActualizar = environment.EstudianteActualizar;
  }

  // Obtener todos los estudiantes
  getAll(): Observable<ApiResponse<EstudiantesResponse>> {
    return this.http.get<ApiResponse<EstudiantesResponse>>(`${this.urlAPi + this.EstudianteTodos}`);
  }

  // Obtener estudiante por ID
  getById(id: number): Observable<ApiResponse<EstudianteDetalleResponse>> {
    console.log("ID ESTUDIANTE AL CONSULTAR", id);
    return this.http.post<ApiResponse<EstudianteDetalleResponse>>(`${this.urlAPi + this.EstudiantesPorId}`, JSON.stringify(id), this.httpOptions);
  }

  // Registrar nuevo estudiante
  create(estudiante: EStudianteCreate): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.urlAPi + this.EstudianteRegistrar}`, estudiante);
  }

  update(estudiante: EStudianteCreate): Observable<ApiResponse<any>> {
  return this.http.put<ApiResponse<any>>(`${this.urlAPi + this.EstudianteActualizar}`, estudiante);
}

  // Obtener compañeros de clase
  getCompanerosByMateria(materiaId: number): Observable<ApiResponse<CompanerosResponse>> {
    return this.http.post<ApiResponse<CompanerosResponse>>(`${this.urlAPi + this.CompanerosTodos}`, materiaId);
  }


  private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
    }
}
