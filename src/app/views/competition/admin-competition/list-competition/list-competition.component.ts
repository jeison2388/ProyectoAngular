import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../competition.service';

@Component({
  selector: 'app-list-competition',
  templateUrl: './list-competition.component.html',
  styleUrls: ['./list-competition.component.scss']
})
export class ListCompetitionComponent implements OnInit {

  competitions: any;
  change=false;
  titleAddCompetition: string;
  subtitleAddCompetition: string;
  nameBtnAddCompetition: string;
  constructor(private competitionService:CompetitionService) 
  {
    this.titleAddCompetition = 'Competencias';
    this.subtitleAddCompetition = 'En este formulario se ingresan los datos para crear una competencia, recuerde los campos con * son obligatorios';
    this.nameBtnAddCompetition = 'Guardar';
  }

  ngOnInit() {
    this.competitionService.cargarCompeticion().subscribe(resultado=>{this.competitions=resultado; this.competitionService.competitions=resultado},
      error=>{ console.log(JSON.stringify(error));});
  }
  cambiar()
  {
    if(this.change)
      this.change=false;
    else
    this.change=true;
  }

}
