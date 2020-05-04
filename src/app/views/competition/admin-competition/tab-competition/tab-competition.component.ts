import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-competition',
  templateUrl: './tab-competition.component.html'
})
export class TabCompetitionComponent implements OnInit {

  /******************************VARIABLES LOCALES********************** */
  public showTeam: boolean;

  constructor() {
    this.showTeam = false;
   }

  ngOnInit() {
  }

  showAddTeam(mostrar: boolean) {
    this.showTeam = mostrar;
  }

}
