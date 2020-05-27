import { Component, OnInit } from '@angular/core';
import {CompetitionService} from '../../../../competition.service';

@Component({
  selector: 'app-list-registration-value-team',
  templateUrl: './list-registration-value-team.component.html',
  styleUrls: ['./list-registration-value-team.component.css']
})
export class ListRegistrationValueTeamComponent implements OnInit {
  players: any;
  categoriaSort: any;
  constructor(private competitionService: CompetitionService) {
    this.players = competitionService.players;
    this.players.categoria.sort();
   }

  ngOnInit() {}
}

