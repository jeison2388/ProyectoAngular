import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Observer } from '@syncfusion/ej2-base';
import { environment } from '../../../../environments/environment';

@Injectable(
  {providedIn: 'root'}
)
export class NivelService {
  private ruta: string;
  constructor(private httpClient: HttpClient) {
    this.ruta =  environment.baseUrl;
  }
  addNiveles(evaluacion: Object): Observable<any> {
    console.log('Evaluacion a guardar::::   ' + JSON.stringify(evaluacion));
    return this.httpClient.post(this.ruta + 'esfoder/guardarEditarNivel', evaluacion, {reportProgress: true, observe: 'events'});
  }

  // CATÁLOGOS
  cargarSubProgramas(): Observable<any> {

    const respuesta = this.httpClient.get(this.ruta + 'esfoder/obtenerSubProgramas');
    return respuesta;
  }
  cargarCategoriasNivel(): Observable<any> {

    const respuesta = this.httpClient.get(this.ruta + 'esfoder/obtenerCategoriasNivel');
    return respuesta;
  }
  cargarProgramaServicio(): Observable<any> {

    const respuesta = this.httpClient.get(this.ruta + 'esfoder/obtenerSubProgramas');
    return respuesta;
  }
  // -- Grupos --
  cargarInstructores(): Observable<any> {

    const respuesta = this.httpClient.get(this.ruta + 'esfoder/obtenerInstructores');
    return respuesta;
  }

}
