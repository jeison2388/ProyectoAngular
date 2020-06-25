import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../competition.service';

@Component({
  selector: 'app-list-competition-nav',
  templateUrl: './list-competition-nav.component.html'
})
export class ListCompetitionNavComponent implements OnInit {
competencias: any;
pageActual:number=1;
filterPost='';
mensaje: string='';
competition:any;
loading:boolean;
 
  constructor(private competitionService:CompetitionService) { 
    this.loading=true;
  }

  ngOnInit() 
  {
    this.competitionService.cargarCompeticion().subscribe(resultado=>{
      this.competencias=resultado; 
      this.competitionService.competitions=resultado
      this.competencias.slice(1,5);
      this.loading=false;
    },
      error=>{ console.log(JSON.stringify(error));});
  }
  asignarIdSeleccionado(c:any)
  {
    this.competitionService.idSelected=c.id;
    this.competitionService.onTeams();
    this.competition=c;
    console.log("Elemento seleccionado:    Id:  "+c.id);
  }

}
