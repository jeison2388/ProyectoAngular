import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { team } from '../../../../../../model/team.model';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html'
})
export class AddTeamComponent implements OnInit {

  titleAddTeam: string;
  subtitleAddTeam: string;
  nameBtnAddTeam: string;
  edit:boolean;
  @Input() idCompetition:number;
 
  
  constructor() {
    this.edit=false;
    this.titleAddTeam = 'Registro de Equipos';
    this.subtitleAddTeam = 'En este formulario se ingresan los datos para registrar un equipo a una competencia, recuerde los campos con * son obligatorios';
    this.nameBtnAddTeam = 'Guardar';
   }

  ngOnInit() {
  }
  

}
