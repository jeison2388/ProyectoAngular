import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../competition.service';

@Component({
  selector: 'app-tab-competition',
  templateUrl: './tab-competition.component.html'
})
export class TabCompetitionComponent implements OnInit {

  /******************************VARIABLES LOCALES********************** */
  public showTeam: boolean;
  public cancel:boolean;
  tam:number;
  constructor(private competitionService:CompetitionService) {
    this.showTeam = false;
    this.cancel=false;
    this.tam=this.competitionService.tamTeam;
   }

  ngOnInit() {
  }
  changeCancel(c:boolean)
  {
    this.cancel=c;
  }
  showAddTeam(mostrar: boolean) {
    this.showTeam = mostrar;
  }

}
