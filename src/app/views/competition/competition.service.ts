import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Observer } from '@syncfusion/ej2-base';

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
  addCompetition(competition: Object, fileToCompetition: any[]):Observable<any>
  {
   /*  ### POST /competicion/agregarCompeticion
    Esta solicitud registra una competicions , usted debe enviar estos datos 
    sin el encabezado "Content Type" y en formato "FormData" los datos que usted debe proveer son los siguientes:  
    Nombre de la variable: **datos**, contenido:
    Nombre de la variable: **indice [ i ]** , por ejemplo **indice1, indice2 ...**, 
    contenido: archivo del indice del libro en formato PDF.  
    En caso de error, el servicio devolverá una respuesta como sigue.
    ```Javascript
      {   "campo": "código del campo",
          "error": "código del error"
      }
        
      return this.httpClient.post("http://localhost:4200/persona",json,);
    
  */
    let headers = new HttpHeaders().set('Content-Type','multipart/form-data');
    let formData = new FormData();
    formData.append('datos',JSON.stringify(competition));
    let contador=1;
    if(fileToCompetition.length!=0)
      for(let i of fileToCompetition)
      {
        formData.append('indice'+contador,i);
        contador++;      
      }  
    //console.log(formData.get('datos'));
    //---------------Post con Headers de FORMDATA  :  Error 415 Media
    //return this.httpClient.post(this.ruta+"competicion/agregarCompeticion", formData,{headers:headers});
  //--------------------POST sin Headers como dice la especificación : 
    return this.httpClient.post(this.ruta+"competicion/agregarCompeticion", formData);
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
