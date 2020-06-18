import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Observer } from '@syncfusion/ej2-base';
import { environment } from '../../../../environments/environment';

@Injectable(
  {providedIn: 'root'}
)
export class InscripcionEsfoder {
  private ruta: string;
  constructor(private httpClient: HttpClient) {
    this.ruta =  environment.baseUrl;
  }
  addInscripcion(inscripcion: Object): Observable<any> {
    console.log('Inscripción a guardar::::   ' + JSON.stringify(inscripcion));
    return this.httpClient.post(this.ruta + 'autogestionAfiliado/guardarVacacionRecreativa', inscripcion, {reportProgress: true, observe: 'events'});
  }

  // CATÁLOGOS
  cargarTiposIdentificacion(): Observable<any> {

    const respuesta = this.httpClient.get(this.ruta + 'catalogo/obtenerTiposIdentificacion');
    return respuesta;
  }
  cargarProgramaVacacionRecreativa(): Observable<any> {

    const respuesta = this.httpClient.get(this.ruta + 'autogestionAfiliado/obtenerProgramaVacacionesRecreativas');
    return respuesta;
  }
}
