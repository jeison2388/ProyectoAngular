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
  //Voy aquí, debo pasar el id, pero team aun no existe en el costructor
  id:number=0;
  constructor(private competitionService:CompetitionService) 
  { 
    this.newPlayer=
    {
      'nombres': 'DEFAULT',
      'apellidos':'DEFAULT',
      'celular': 'DEFAULT',
      'cedula': 'DEFAULT',
      'valor': 'DEFAULT',
      'categoria': 'DEFAULT'
    };   
    console.log("Arreglo newPlayer creado****************************",this.newPlayer);
  }

  ngOnInit() {
    if(!this.create)
    {
      this.players=this.competitionService.players;   
      this.competitionService.onPlayers(this.team.id);       
    }
   
  }

}
