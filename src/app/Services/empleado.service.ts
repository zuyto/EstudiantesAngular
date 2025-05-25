import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EmpleadosModel } from '../Componets/empleado/empleado.model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private urlAPi: string;
  private EmpleadoController: string;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {
    this.urlAPi = environment.urlApi;
    this.EmpleadoController = environment.EmpleadoController;
  }
  private extraerDatos(res: Response) {
    let body = res;
    return body || {};
  }
  GetEmpleados() {
    let url = `${this.urlAPi + this.EmpleadoController + '/GetEmpleados'}`;
    return this.http.get(url).pipe(map(this.extraerDatos));
  }
  GetObjEmpleado(entidad: EmpleadosModel): any {
    let url = this.urlAPi + this.EmpleadoController + '/GetObjEmpleado';
    return this.http
      .post<any>(url, JSON.stringify(entidad), this.httpOptions)
      .pipe(catchError(this.handleError<any>('Get Obj  Empleado')));
  }
  CreateEmpleado(entidad: EmpleadosModel): Observable<any> {
    let url = this.urlAPi + this.EmpleadoController + '/CreateEmpleado';
    return this.http
      .post<any>(url, JSON.stringify(entidad), this.httpOptions)
      .pipe(catchError(this.handleError<any>('Crear Empleado')));
  }

  UpdateEmpleado(entidad: EmpleadosModel): Observable<any> {
    let url = `${this.urlAPi + this.EmpleadoController + '/UpdateEmpleado'}`;
    return this.http
      .put(url, JSON.stringify(entidad), this.httpOptions)
      .pipe(catchError(this.handleError<any>('actualizar Empleado')));
  }

  /* DeleteEmpleado(id): Observable<any> {
    const url = `${this.urlAPi + this.EmpleadoController + '/DeleteEmpleado'}`;
    return this.http
      .post<any>(url, id, this.httpOptions)
      .pipe(catchError(this.handleError<any>('eliminar Empleado')));
  } */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
