import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-evaluaciones',
  templateUrl: './edit-evaluaciones.component.html'
})
export class EditEvaluacionesComponent implements OnInit {

  titlePanel: string;
  titleAddEvaluaciones: string;
  subtitleAddEvaluaciones: string;
  nameBtnAddEvaluaciones: string;

  constructor() {
    this.titlePanel = 'ESCUELAS DE FORMACIÓN DEPORTIVA';
    this.titleAddEvaluaciones = 'Editar Evaluación';
    this.subtitleAddEvaluaciones = 'En este formulario se ingresan los datos para crear una Evaluación, recuerde los campos con * son obligatorios';
    this.nameBtnAddEvaluaciones = 'Guardar';
  }

  ngOnInit() {
  }

}
