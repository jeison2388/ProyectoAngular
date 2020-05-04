import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-teams',
  templateUrl: './list-teams.component.html'
})
export class ListTeamsComponent implements OnInit {

  /****************************************VARIABLES DE SALIDA DEL COMPONENTE*********************** */
  @Output() showAddTeam = new EventEmitter<{showAddTeam: boolean}>();

  constructor() { }

  ngOnInit() {
  }

  sendEventAddTeam() {
    this.showAddTeam.emit({showAddTeam: true});
  }

}
