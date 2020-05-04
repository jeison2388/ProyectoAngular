import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-evaluaciones',
  templateUrl: './add-evaluaciones.component.html'
})
export class AddEvaluacionesComponent implements OnInit {

  titlePanel: string;
  titleAddEvaluaciones: string;
  subtitleAddEvaluaciones: string;
  nameBtnAddEvaluaciones: string;

  constructor() {
    this.titlePanel = 'ESCUELAS DE FORMACIÓN DEPORTIVA';
    this.titleAddEvaluaciones = 'Nueva Evaluación';
    this.subtitleAddEvaluaciones = 'En este formulario se ingresan los datos para crear una Evaluación, recuerde los campos con * son obligatorios';
    this.nameBtnAddEvaluaciones = 'Guardar';
  }

  ngOnInit() {
  }

}
