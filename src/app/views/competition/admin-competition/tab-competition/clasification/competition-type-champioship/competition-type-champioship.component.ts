import { Component, OnInit, Input } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-competition-type-champioship',
  templateUrl: './competition-type-champioship.component.html',
  styleUrls: ['./competition-type-champioship.component.scss']
})
export class CompetitionTypeChampioshipComponent implements OnInit {

  @Input() teamsCompetition: Array<JSON>;

  cantGroup: number ;

  groupCompetition: Array<any>;



  constructor() {
    this.cantGroup = 1;
    this.groupCompetition = new Array();
    this.addGroups();
  }

  addGroups() {
    const newGroup = {};
    newGroup['id'] = this.cantGroup;
    newGroup['teams'] = [];
    this.groupCompetition.push(newGroup);
    this.cantGroup ++;
  }

  deleteGroup() {

  }

  ngOnInit() {
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
