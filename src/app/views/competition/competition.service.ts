import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Observer } from '@syncfusion/ej2-base';



@Injectable(
  {providedIn: 'root'}
)
export class CompetitionService {
  private ruta:string;
  constructor(private httpClient:HttpClient)
  {
    this.ruta="http://c417867e.ngrok.io/";
  }
  addCompetition(competition: Object, fileToCompetition: any[]):Observable<any>
  {
    console.log("COMPETENCIA A ENVIAR:   "+JSON.stringify(competition));
    const formData = new FormData();
    formData.append('datos',JSON.stringify(competition));
    let contador=1;
    if(fileToCompetition.length!=0)
      for(let i of fileToCompetition)
      {
        formData.append('indice'+contador,JSON.stringify(i));
        console.log("ARCHIVO:  "+i.file);
        contador++;      
      }  
      else
        formData.append('indice'+contador,JSON.stringify(fileToCompetition));
        
    return this.httpClient.post(this.ruta+"competicion/agregarCompeticion", formData,{reportProgress: true, observe: 'events'});
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
    return respuesta;
  }
  obtenerItemsDesempate():Observable<any>
  {
    let respuesta =this.httpClient.get(this.ruta+"competicion/obtenerItemsDesempate");
   return respuesta;
  }
}
