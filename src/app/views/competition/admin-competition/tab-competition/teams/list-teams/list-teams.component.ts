import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CompetitionService } from '../../../../competition.service';
import { team } from '../../../../../../model/team.model';
import { map } from 'rxjs/operators';
import {from} from 'rxjs';

@Component({
  selector: 'app-list-teams',
  templateUrl: './list-teams.component.html'
})
export class ListTeamsComponent implements OnInit {

  /****************************************VARIABLES DE SALIDA DEL COMPONENTE*********************** */
  @Output() showAddTeam = new EventEmitter<{showAddTeam: boolean}>();
  public cancel:number=0;
  public editar = false;
  public competition:any;
  public t: any;
  public idCompetencia :number;
  public creado:boolean;
  teams: any[]=[];
  newPlayer:any;
  agregado:boolean;
  /* [
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
    }
  ];
   */
  filterPost='';
  mensaje: string='';
  constructor(private competitionService:CompetitionService ) {
      this.idCompetencia = this.competitionService.idSelected;
      this.creado=false;
   }


  ngOnInit() {
    this.teams=this.competitionService.teams;
  }
  setCancel(e)
  {
    this.cancel=e;
    console.log("Evento recibido.valor=  "+e);
  }
  onTeam(event)
  {
    console.log("#############IMPRIMIENDO DESDE ONTEAM:  "+event.nombre);
    this.t=event;
    this.cancel=2;  
    this.ngOnInit();
  }
  onCancel(n:number)
  {   
    this.cancel=n;
  }
  onPlayer(event)
  {
    this.newPlayer=event;
  }
  onAgregado(event)
  {
    this.agregado=event;
  }
onSave(n:number)
{
  this.cancel=n;
}
  sendEventAddTeam() {
    this.showAddTeam.emit({showAddTeam: true});
  }

  editTeam(equipo: any) {
    console.log('entor al editar');
    if (this.editar) {
      this.editar = false;
    }else {
      this.editar = true;
    }
    this.t = equipo;
    this.cancel=2;

  }
}
