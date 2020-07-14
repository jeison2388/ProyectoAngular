import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Observer } from '@syncfusion/ej2-base';
import { environment } from '../../../../environments/environment';
import { SubComponente } from '../models/SubComponente';
import { map, take } from 'rxjs/operators';


@Injectable(
  {providedIn: 'root'}
)
export class EvaluacionService {
  private ruta: string;
  constructor(private httpClient: HttpClient) {
    this.ruta = environment.baseUrl;
  }
  addEvaluacion(evaluacion: Object): Observable<any> {
    console.log('Evaluacion Inicial a guardar::::   ' + JSON.stringify(evaluacion));
    return this.httpClient.post(this.ruta + 'esfoder/guardarEditarEvaluacion', evaluacion, {reportProgress: true, observe: 'events'});
  }

  // CATÁLOGOS
  cargarSubProgramas(): Observable<any> {

    const respuesta = this.httpClient.get(this.ruta + 'esfoder/obtenerSubProgramas');
    return respuesta;
  }
  cargarNiveles(): Observable<any> {

    const respuesta = this.httpClient.get(this.ruta + 'esfoder/obtenerNiveles');
    return respuesta;
  }
  cargarEscalaValorativa(): Observable<any> {

    const respuesta = this.httpClient.get(this.ruta + 'esfoder/obtenerNivelesEvaluacion');
    return respuesta;
  }
  cargarComponentes(): Observable<any> {

    const respuesta = this.httpClient.get(this.ruta + 'esfoder/obtenerComponentes');
    return respuesta;
  }

  cargarSubComponentes(): Observable<any> {
    const respuesta = this.httpClient.get(this.ruta + 'esfoder/obtenerSubComponentes');
    return respuesta;
  }

  obtenerEvaluacion(id): Observable<any> {
    return this.httpClient.get(this.ruta + 'esfoder/obtenerEvaluacion/' + id)
      .pipe(map((res: Response) => {
        return res;
      }));
  }

  obtenerComponentesEvaluacion(id): Observable<any> {
    return this.httpClient.get(this.ruta + 'esfoder/obtenerComponentesEvaluacion/' + id)
      .pipe(map((res: Response) => {
        return res;
      }));
  }

  obtenerSubComponentesEvaluacion(id): Observable<any> {
    return this.httpClient.get(this.ruta + 'esfoder/obtenerSubComponentesEvaluacion/' + id)
      .pipe(map((res: Response) => {
        return res;
      }));
  }

  obtenerEscalaValorativa(id): Observable<any> {
    return this.httpClient.get(this.ruta + 'esfoder/obtenerEscalaValorativa/' + id)
      .pipe(map((res: Response) => {
        return res;
      }));
  }
}
