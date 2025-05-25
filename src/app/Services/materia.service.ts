import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, MateriasResponse } from '../Models/api-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  private urlAPi: string;
  private MateriasTodas: string;

  constructor(private http: HttpClient) {
    this.urlAPi = environment.urlApi;
    this.MateriasTodas = environment.MateriasTodas;
   }

  getAll(): Observable<ApiResponse<MateriasResponse>> {
    return this.http.get<ApiResponse<MateriasResponse>>(`${this.urlAPi + this.MateriasTodas}`);
  }
}
