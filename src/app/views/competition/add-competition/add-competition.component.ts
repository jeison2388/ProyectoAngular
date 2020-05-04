import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-competition',
  templateUrl: './add-competition.component.html'
})
export class AddCompetitionComponent implements OnInit {

  titleAddCompetition: string;
  subtitleAddCompetition: string;
  nameBtnAddCompetition: string;

  constructor() {
    this.titleAddCompetition = 'Registro de Competencias';
    this.subtitleAddCompetition = 'En este formulario se ingresan los datos para crear una competencia, recuerde los campos con * son obligatorios';
    this.nameBtnAddCompetition = 'Guardar';
  }

  ngOnInit() {
  }

}
