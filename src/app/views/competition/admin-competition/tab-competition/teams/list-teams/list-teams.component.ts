import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CompetitionService } from '../../../../competition.service';

@Component({
  selector: 'app-list-teams',
  templateUrl: './list-teams.component.html'
})
export class ListTeamsComponent implements OnInit {

  /****************************************VARIABLES DE SALIDA DEL COMPONENTE*********************** */
  @Output() showAddTeam = new EventEmitter<{showAddTeam: boolean}>();
  public competition:any;
  teams: any[];
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
  constructor(private competitionService:CompetitionService) {

   }

  
  ngOnInit() {
    this.teams=this.competitionService.teams;
  }

  sendEventAddTeam() {
    this.showAddTeam.emit({showAddTeam: true});
  }
}
