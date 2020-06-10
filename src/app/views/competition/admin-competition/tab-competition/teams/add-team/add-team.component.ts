import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html'
})
export class AddTeamComponent implements OnInit {

  titleAddTeam: string;
  subtitleAddTeam: string;
  nameBtnAddTeam: string;
 
  
  constructor() {
    this.titleAddTeam = 'Registro de Equipos';
    this.subtitleAddTeam = 'En este formulario se ingresan los datos para registrar un equipo a una competencia, recuerde los campos con * son obligatorios';
    this.nameBtnAddTeam = 'Guardar';
   }

  ngOnInit() {
  }
  

}
