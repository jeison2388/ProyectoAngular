import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../competition.service';

@Component({
  selector: 'app-list-competition-nav',
  templateUrl: './list-competition-nav.component.html'
})
export class ListCompetitionNavComponent implements OnInit {
competencias: any;
pageActual:number=1;
 
  constructor(private competitionService:CompetitionService) { }

  ngOnInit() 
  {
    this.competitionService.cargarCompeticion().subscribe(resultado=>{
      this.competencias=resultado; 
      this.competitionService.competitions=resultado
      this.competencias.slice(1,5);
    },
      error=>{ console.log(JSON.stringify(error));});
  }
  asignarIdSeleccionado(id:number)
  {
    this.competitionService.idSelected=id;
    this.competitionService.onTeams();
    console.log("Elemento seleccionado:    Id:  "+id);
  }

}
