import { Component, OnInit, Input } from '@angular/core';
import { CompetitionService } from '../competition.service';

@Component({
  selector: 'app-edit-competition',
  templateUrl: './edit-competition.component.html'
})
export class EditCompetitionComponent implements OnInit {

  titleAddCompetition: string;
  subtitleAddCompetition: string;
  nameBtnAddCompetition: string;

  constructor(private competitionService:CompetitionService) {
    this.titleAddCompetition = 'Edición de Competencias';
    this.subtitleAddCompetition = 'En este formulario se editaran algunos datos de la competencia, recuerde los campos con * son obligatorios';
    this.nameBtnAddCompetition = 'Guardar';
   }

  ngOnInit() {
  }

}
