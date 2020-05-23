import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-teams',
  templateUrl: './list-teams.component.html'
})
export class ListTeamsComponent implements OnInit {

  /****************************************VARIABLES DE SALIDA DEL COMPONENTE*********************** */
  @Output() showAddTeam = new EventEmitter<{showAddTeam: boolean}>();
  equipos: [
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
  constructor() { }

  
  ngOnInit() {
  }

  sendEventAddTeam() {
    this.showAddTeam.emit({showAddTeam: true});
  }

}
