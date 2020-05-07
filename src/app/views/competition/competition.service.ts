import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers : new HttpHeaders({ 'Content-Type': 'application/json'})
}

@Injectable(
  {providedIn: 'root'}
)
export class CompetitionService {
  private ruta:string;
  constructor(private httpClient:HttpClient)
  {
    this.ruta="http://pruebasweb.comfacauca.com:8080/";
  }
  addCompetition(competition: Object, fileToCompetition: any[])
  {
    let json= JSON.stringify(competition);
    //encabezado "Content Type" y en formato "FormData" 
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.httpClient.post(this.ruta,json,{headers:headers});
  }
  cargarDeportes():Observable<any>
  {
    
    let respuesta = this.httpClient.get(this.ruta+"competicion/obtenerDeportes");
    return respuesta;
  }
  cargarCategorias():Observable<any>
  {
    
    let respuesta = this.httpClient.get(this.ruta+"competicion/obtenerCategorias");
    return respuesta;
  }
  cargarModalidades():Observable<any>
  {
    
    let respuesta = this.httpClient.get(this.ruta+"competicion/obtenerModalidades");
    return respuesta;
  }
  cargarDuracionPartido():Observable<any>
  {
    
    let respuesta = this.httpClient.get(this.ruta+"competicion/obtenerDuracionesPartidos");
    return respuesta;
  }
  cargarTiposCompeticion():Observable<any>
  {
    
    let respuesta = this.httpClient.get(this.ruta+"competicion/obtenerTiposCompeticion");
    return respuesta;
  }
  cargarTiposEliminatoria():Observable<any>
  {
    
    let respuesta = this.httpClient.get(this.ruta+"competicion/obtenerNumeroEliminatorias");
    return respuesta;
  }
  cargarGeneros():Observable<any>
  {
    
    let respuesta = this.httpClient.get(this.ruta+"competicion/obtenerGeneros");
    return respuesta;
  }
  cargarMinimoEquipos():Observable<any>
  {
    
    let respuesta = this.httpClient.get(this.ruta+"competicion/obtenerNumeroMinimoEquiposTorneo");
    console.log("Elementos equipos minimos JSON: "+respuesta);
    return respuesta;
  }
  obtenerItemsDesempate():Observable<any>
  {
    let respuesta =this.httpClient.get(this.ruta+"competicion/obtenerItemsDesempate");
    console.log("Elementos items JSON: "+respuesta);
   return respuesta;
  }
}
