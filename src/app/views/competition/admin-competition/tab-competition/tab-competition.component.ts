import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../competition.service';

@Component({
  selector: 'app-tab-competition',
  templateUrl: './tab-competition.component.html'
})
export class TabCompetitionComponent implements OnInit {

  /******************************VARIABLES LOCALES********************** */
  public showTeam: boolean;
  tam:number;
  constructor(private competitionService:CompetitionService) {
    this.showTeam = false;
    this.tam=this.competitionService.tamTeam;
   }

  ngOnInit() {
  }

  showAddTeam(mostrar: boolean) {
    this.showTeam = mostrar;
  }

}
