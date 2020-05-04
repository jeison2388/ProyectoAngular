import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-niveles',
  templateUrl: './add-niveles.component.html'
})
export class AddNivelesComponent implements OnInit {

  titlePanel: string;
  titleNiveles: string;
  subtitleNiveles: string;
  nameBtnNiveles: string;

  constructor() {
    this.titlePanel = 'ESCUELAS DE FORMACIÓN DEPORTIVA';
    this.titleNiveles = 'Nuevo Nivel';
    this.subtitleNiveles = 'En este formulario se ingresan los datos para crear un Nivel, recuerde los campos con * son obligatorios';
    this.nameBtnNiveles = 'Guardar';
  }

  ngOnInit() {
  }

}
