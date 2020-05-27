import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Observer } from '@syncfusion/ej2-base';
import{player} from '../../model/player.model';
import { team } from '../../model/team.model'



@Injectable(
  {providedIn: 'root'}
)
export class CompetitionService {
  private ruta:string;
  public idSelected=0;
  public competitions:any;
  players: player[]=[];
  teams:team[]=[];

  constructor(private httpClient:HttpClient)
  {
    this.ruta="http://pruebasweb.comfacauca.com:8080/";
  }
  cargarJugadores():player[]
  {
      let jugadores:player[]=
      [
        {
          cedula: "10344242",
          nombres: "Pedro Felipe",
          apellidos:"Robledo Samboní",
          celular:"24353423244",
          categoria:"A",
          valor:7900
        } ,
        {
          cedula: "1061567093",
          nombres: "Manuel Santiago",
          apellidos:"Martinez Vasquez",
          celular:"23345255656",
          categoria:"B",
          valor:9700
        } 
      ];
      return jugadores;
  }
  cargarEquipos(idCompetencia:number):team[]
  {
        let equipos: team[]=[
        {
          numero: 1,
          Logo: "u496",
          NombreEquipo:"HOTEL ACHALAY",
          Delegado:"ANDRES FELIPE RESTREPO",
          identificacion:1232353453,
          telefono:23453456567,
          estado:"Pendiente de pago"
        },
        {
          numero: 1,
          Logo: "u497",
          NombreEquipo:"DIAGNOSTIMOTOS",
          Delegado:"IGNACIO VIVEROS",
          identificacion:1232353453,
          telefono:23453456567,
          estado:"Pendiente realizado"
        },
        {
          numero: 1,
          Logo: "u497",
          NombreEquipo:"DIAGNOSTIMOTOS",
          Delegado:"IGNACIO VIVEROS",
          identificacion:1232353453,
          telefono:23453456567,
          estado:"Pendiente realizado"
        },
        {
          numero: 1,
          Logo: "u497",
          NombreEquipo:"DIAGNOSTIMOTOS",
          Delegado:"IGNACIO VIVEROS",
          identificacion:1232353453,
          telefono:23453456567,
          estado:"Pendiente realizado"
        },
        {
          numero: 1,
          Logo: "u497",
          NombreEquipo:"DIAGNOSTIMOTOS",
          Delegado:"IGNACIO VIVEROS",
          identificacion:1232353453,
          telefono:23453456567,
          estado:"Pendiente realizado"
        },
        {
          numero: 1,
          Logo: "u497",
          NombreEquipo:"DIAGNOSTIMOTOS",
          Delegado:"IGNACIO VIVEROS",
          identificacion:1232353453,
          telefono:23453456567,
          estado:"Pendiente realizado"
        }
      ]; 
      //return  this.httpClient.get<team>(this.ruta+"competicion/obtenerEquipos");
      return equipos;
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
  competenciaSeleccionada():any
  {    
    for(let competition of this.competitions ){
        if(competition.id==this.idSelected)         
          return competition;          
    }
  }
   cargarCompeticion():Observable<any>
   {
    let respuesta = this.httpClient.get(this.ruta+"competicion/obtenerCompetencias");
    this.competitions=respuesta;
    return respuesta;
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
