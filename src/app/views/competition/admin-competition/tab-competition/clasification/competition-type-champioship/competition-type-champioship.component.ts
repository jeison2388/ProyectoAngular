import { Component, OnInit, Input } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { team } from '../../../../../../model/team.model';

@Component({
  selector: 'app-competition-type-champioship',
  templateUrl: './competition-type-champioship.component.html',
  styleUrls: ['./competition-type-champioship.component.scss']
})
export class CompetitionTypeChampioshipComponent {
  @Input() teamsCompetition:team[];
  cantGroup: number ;
  numeroGrupos=0;
  groupCompetition: Array<any>;
  teams:Array<team>;
  nuevoGrupo=true;

  constructor() {
   
    
    this.cantGroup = 1;
    this.groupCompetition = new Array();
    this.addGroups();
  }

  addGroups() {
    const newGroup = {};
    if(this.cantGroup<this.calcularMaximoGrupos())
    {
      this.nuevoGrupo=true;
      newGroup['id'] = this.cantGroup;
      newGroup['teams'] = [];
      this.groupCompetition.push(newGroup);
      this.cantGroup ++ ;      
    }
    else    
      if(this.teamsCompetition!=null)      
        console.log("TEAMS NO ES NULO:   "+this.teamsCompetition.length);
  }
  
  calcularMaximoGrupos()
  {
    let tam=0;
    if(this.teamsCompetition!=null)  
       tam= this.teamsCompetition.length;
    console.log("Calculando el maximo de grupos:   "+tam);
    return tam/2;
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
