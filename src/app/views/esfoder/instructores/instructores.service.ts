import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Observer } from '@syncfusion/ej2-base';
import { environment } from '../../../../environments/environment';



@Injectable(
  {providedIn: 'root'}
)
export class InstructorService {
  private ruta: string;
  constructor(private httpClient: HttpClient) {
    this.ruta = environment.baseUrl;
  }
  addEvaluacion(evaluacion: Object): Observable<any> {
    console.log('Evaluacion a guardar::::   ' + JSON.stringify(evaluacion));
    return this.httpClient.post(this.ruta + 'esfoder/guardarEditarEvaluacion', evaluacion, {reportProgress: true, observe: 'events'});
  }

  // CATÁLOGOS
  cargarProgramas(): Observable<any> {

    const respuesta = this.httpClient.get(this.ruta + 'esfoder/obtenerProgramas');
    return respuesta;
  }

}
