import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../../../competition.service';

@Component({
  selector: 'app-list-players',
  templateUrl: './list-players.component.html',
  styleUrls: ['./list-players.component.css']
})
export class ListPlayersComponent implements OnInit {

  filterPost='';
  players:any;
  constructor(private competitionService:CompetitionService) 
  { 
    this.players=competitionService.players;
  }

  ngOnInit() {
  }

}
