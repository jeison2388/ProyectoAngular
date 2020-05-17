import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../competition.service';

@Component({
  selector: 'app-list-competition-nav',
  templateUrl: './list-competition-nav.component.html'
})
export class ListCompetitionNavComponent implements OnInit {
competencias: any;

 
  constructor(private competitionService:CompetitionService) { }

  ngOnInit() 
  {
    this.competitionService.cargarCompeticion().subscribe(resultado=>{this.competencias=resultado; this.competitionService.competitions=resultado},
      error=>{ console.log(JSON.stringify(error));});
  }
  asignarIdSeleccionado(id:number)
  {
    this.competitionService.idSelected=id;
    console.log("Elemento seleccionado:    Id:  "+id);
  }

}
