import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-instructores',
  templateUrl: './add-instructores.component.html'
})
export class AddInstructoresComponent implements OnInit {

  titlePanel: string;
  titleAddInstructores: string;
  subtitleAddInstructores: string;
  nameBtnAddInstructores: string;

  constructor() {
    this.titlePanel = 'ESCUELAS DE FORMACIÓN DEPORTIVA';
    this.titleAddInstructores = 'Nuevo Instructor';
    this.subtitleAddInstructores = 'En este formulario se ingresan los datos para crear un Instructor, recuerde los campos con * son obligatorios';
    this.nameBtnAddInstructores = 'Guardar';
  }

  ngOnInit() {
  }

}
