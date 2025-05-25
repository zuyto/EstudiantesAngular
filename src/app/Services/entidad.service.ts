import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EntidadesModel } from '../Componets/entidad/entidad.model';

@Injectable({
  providedIn: 'root'
})
export class EntidadService {

  private urlAPi: string;
  private EntidadController: string;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {
    this.urlAPi = environment.urlApi;
    this.EntidadController = environment.EntidadController;
  }
  private extraerDatos(res: Response) {
    let body = res;
    return body || {};
  }
  GetEntidades() {
    let url = `${this.urlAPi + this.EntidadController + '/GetEntidades'}`;
    return this.http.get(url).pipe(map(this.extraerDatos));
  }
  GetObjEntidad(entidad: EntidadesModel): any {
    let url = this.urlAPi + this.EntidadController + '/GetObjEntidad';
    return this.http
      .post<any>(url, JSON.stringify(entidad), this.httpOptions)
      .pipe(catchError(this.handleError<any>('Get Obj  Entidades')));
  }
  CreateEntidad(entidad: EntidadesModel): Observable<any> {
    let url = this.urlAPi + this.EntidadController + '/CreateEntidad';
    return this.http
      .post<any>(url, JSON.stringify(entidad), this.httpOptions)
      .pipe(catchError(this.handleError<any>('Crear Entidad')));
  }

  UpdateEntidad(entidad: EntidadesModel): Observable<any> {
    let url = `${this.urlAPi + this.EntidadController + '/UpdateEntidad'}`;
    return this.http
      .put(url, JSON.stringify(entidad), this.httpOptions)
      .pipe(catchError(this.handleError<any>('actualizar Entidad')));
  }

  /* eliminar(id): Observable<any> {
    const url = `${this.urlAPi + this.EntidadController + '/DeleteEntidad'}`;
    return this.http
      .post<any>(url, id, this.httpOptions)
      .pipe(catchError(this.handleError<any>('eliminar Entidad')));
  } */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  }
