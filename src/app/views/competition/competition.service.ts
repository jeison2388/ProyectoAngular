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
  public idFinal=0;
  public competitions:any;
  players: any[]=[];
  teams:any[]=[];
  tamTeam=0;
  
  constructor(private httpClient:HttpClient)
  {
    this.ruta="http://pruebasweb.comfacauca.com:8080/";
  }
  cargarJugadores(id:number):Observable<any>
  {
      let jugadores:any;
      let rutaJugadores=this.ruta+"competicion/equipos/obtenerJugadores/" +id;
      jugadores= this.httpClient.get( rutaJugadores);
      console.log("RUTA:   "+rutaJugadores);    
      return jugadores;
  }
  onPlayers(id:number)
  {
    this.players.length=0;
    this.cargarJugadores(id).subscribe(resultado=>{
      for(let i of resultado){
        this.players.push(i); 
      }               
    },
      error=>{ console.log(JSON.stringify(error));});        
      console.log("TAMAÑO DE ARRAY ( id:   "+id+")JUGADORES:   "+this.players.length);     
    }   
    
    
  onTeams()
  {
    this.idFinal=0;
    this.teams.length=0;
    this.cargarEquipos().subscribe(resultado=>{
      for(let i of resultado)
      {
        this.teams.push(i);  
        if(i.id>this.idFinal)
          this.idFinal=i.id;
      }
              
    },
      error=>{ console.log(JSON.stringify(error));});
      this.tamTeam=this.teams.length;      
  }
  cargarEquipos():Observable<any>
  {
    let equipos: any;
    let rutaEquipos=this.ruta+"competicion/obtenerEquipos/"+this.idSelected;
    equipos= this.httpClient.get(this.ruta+"competicion/obtenerEquipos/"+this.idSelected);      
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
        formData.append('indice',i.file);
        console.log("ARCHIVO:  "+JSON.stringify(i.file));
        //contador++;
      }      
    return this.httpClient.post(this.ruta+"competicion/agregarCompeticion", formData,{reportProgress: true, observe: 'events'});
  }
  addPlayer(player:Object):Observable<any>
  {
    return this.httpClient.post(this.ruta+"competicion/agregarJugador",player,{reportProgress: true, observe: 'events'});
  }
  addTeam(team:Object):Observable<any>
  {
    return this.httpClient.post(this.ruta+"competicion/agregarEquipo",team,{reportProgress: true, observe: 'events'});
  }
  competenciaSeleccionada():any
  {
    for(let competition of this.competitions ){
        if(competition.id==this.idSelected)
        { 
          
          let comp={
            "id":competition.id,
            "nombre":competition.nombre,
            "deporte":competition.subPrograma.descripcion,
            "categoria":competition.categoriaDep.descripcion,
            "modalidad":competition.modalidad.descripcion,
            "fechaInicio":competition.fechaInicio,
            "fechaFin":competition.fechaFinaliza,
            "duracion":competition.duracion.descripcion,
            "tipoCompeticion":competition.tipoCompeticion.descripcion,
            "eliminatoria":competition.eliminatoria.descripcion,
            "genero":competition.genero.descripcion,
            "minimoEquipos":competition.numeroEquipo.descripcion,
            "minimoInscritos":competition.numeroMinimo,
            "tercerCuarto":competition.tercerCuarto,
            "reglas":{
              "activo":competition.reglas.activo,
              "prioridad":competition.reglas.prioridad,
              "descripcion":competition.reglas.descripcion,
              "id":competition.reglas.id
            }
          }
          return comp;
        
        }
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
  cargarCategorias1():any[]
  {
    let categorias = [
        {
          categoria: 'A',
          valor: 7900
        },
        {
          categoria: 'B',
          valor: 9700
        },
        {
          categoria: 'C',
          valor: 12800
        },
        {
          categoria: 'PARTICULAR',
          valor: 13000
        }];
    /*let respuesta = this.httpClient.get(this.ruta+"competicion/obtenerCategorias");
    return respuesta;*/
        return categorias;
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
