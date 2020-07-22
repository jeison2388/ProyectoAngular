import { Component, OnInit, Input, SimpleChanges, OnChanges, DoCheck } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { team } from '../../../../../../model/team.model';
import { CompetitionService } from '../../../../competition.service';

@Component({
  selector: 'app-competition-type-champioship',
  templateUrl: './competition-type-champioship.component.html',
  styleUrls: ['./competition-type-champioship.component.scss']
})
export class CompetitionTypeChampioshipComponent implements DoCheck {
  teamsCompetition: Array<any>;
  cantGroup: number;
  numeroGrupos = 0;
  groupCompetition: Array<any>;
  nuevoGrupo = true;
  idCompetencia: number;

  constructor(private competitionService: CompetitionService) {

    this.idCompetencia = this.competitionService.idSelected;
    this.cantGroup = 1;
    this.groupCompetition = new Array();
    this.addGroups();
  }


  addGroups() {
    const newGroup = {};
    if (this.cantGroup < this.calcularMaximoGrupos()) {
      this.nuevoGrupo = true;
      newGroup['id'] = this.cantGroup;
      newGroup['teams'] = [];
      this.groupCompetition.push(newGroup);
      this.cantGroup++;
    }
    else
      if (this.teamsCompetition != null)
        console.log("TEAMS NO ES NULO:   " + this.teamsCompetition.length);
  }
  ngDoCheck(): void {
    if (this.idCompetencia != this.competitionService.idSelected) {
      this.idCompetencia = this.competitionService.idSelected;
      this.competitionService.cargarEquipos().subscribe(resultado => {
        this.teamsCompetition = new Array<any>();
        for (let i of resultado)
          this.teamsCompetition.push(i);
      },
        error => { console.log(JSON.stringify(error)); });
    }
  }
  aleatorio() {
    let random = Math.round(Math.random() * 2);
    let tempTeam = new Array<any>();
    for (let t of this.teamsCompetition)
      tempTeam.push(t);
    for (let grupo of this.groupCompetition)
      grupo.teams = [];
    while (tempTeam.length > 0) {
      for (let grupo of this.groupCompetition) {
        if (tempTeam.length > 0) {
          if (random > 1) {
            tempTeam.reverse();
            random = Math.round(Math.random() * 2);
            grupo.teams.push(tempTeam.pop());
          }
          else {
            random = Math.round(Math.random() * 2);
            grupo.teams.push(tempTeam.pop());
          }

        }

      }
    }

  }
  calcularMaximoGrupos() {
    let tam = 0;
    if (this.teamsCompetition != null)
      tam = this.teamsCompetition.length;
    console.log("Calculando el maximo de grupos:   " + tam);
    return tam / 2;
  }
  deleteGroup() {

  }



  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      // array teams

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // array groups
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

    }
  }

}
