import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-competition',
  templateUrl: './edit-competition.component.html'
})
export class EditCompetitionComponent implements OnInit {

  titleAddCompetition: string;
  subtitleAddCompetition: string;
  nameBtnAddCompetition: string;

  constructor() {
    this.titleAddCompetition = 'Edición de Competencias';
    this.subtitleAddCompetition = 'En este formulario se editaran algunos datos de la competencia, recuerde los campos con * son obligatorios';
    this.nameBtnAddCompetition = 'Guardar';
   }

  ngOnInit() {
  }

}
