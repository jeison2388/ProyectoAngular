import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../../../competition.service';
import {player} from '../../../../../../model/player.model';
@Component({
  selector: 'app-list-players',
  templateUrl: './list-players.component.html',
  styleUrls: ['./list-players.component.css']
})
export class ListPlayersComponent implements OnInit {

  filterPost='';
  players:player[]=[];
  constructor(private competitionService:CompetitionService) 
  { 
    this.players=competitionService.cargarJugadores();
  }

  ngOnInit() {
  }

}
