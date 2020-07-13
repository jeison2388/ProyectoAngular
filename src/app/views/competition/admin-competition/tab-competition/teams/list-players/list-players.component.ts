import { Component, OnInit, Input } from '@angular/core';
import { CompetitionService } from '../../../../competition.service';
import {player} from '../../../../../../model/player.model';
@Component({
  selector: 'app-list-players',
  templateUrl: './list-players.component.html',
  styleUrls: ['./list-players.component.css']
})
export class ListPlayersComponent implements OnInit {

  filterPost='';
  players:any[]=[];
  @Input() Agregado:boolean=false;
  @Input() team:any;
  @Input() create:boolean;
  @Input() newPlayer:any;
  constructor(private competitionService:CompetitionService) 
  { 
    console.log("Arreglo newPlayer creado****************************",this.newPlayer);
  }

  ngOnInit() {
    if(this.team!=null)
    {
      this.players=this.competitionService.players;   
      this.competitionService.onPlayers(this.team.id);       
    }   
  }

}
