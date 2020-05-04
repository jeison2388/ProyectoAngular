import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-niveles',
  templateUrl: './edit-niveles.component.html'
})
export class EditNivelesComponent implements OnInit {

  titlePanel: string;
  titleNiveles: string;
  subtitleNiveles: string;
  nameBtnNiveles: string;

  constructor() {
    this.titlePanel = 'ESCUELAS DE FORMACIÓN DEPORTIVA';
    this.titleNiveles = 'Editar Nivel';
    this.subtitleNiveles = 'En este formulario se ingresan los datos para editar un Nivel, recuerde los campos con * son obligatorios';
    this.nameBtnNiveles = 'Guardar';
  }

  ngOnInit() {
  }

}
