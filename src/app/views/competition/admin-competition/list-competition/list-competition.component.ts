import { Component, OnInit } from '@angular/core';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import * as go from 'gojs';

@Component({
  selector: 'app-list-competition',
  templateUrl: './list-competition.component.html',
  styleUrls: ['./list-competition.component.scss']
})
export class ListCompetitionComponent implements OnInit {
  public myDiagram: go.Diagram = null;
 
  constructor() 
  {
   
  }

  ngOnInit() {
  
  }
  cargarGrafico()
  {
    var $=go.GraphObject.make;
    //myDiagram=$(go.Diagram,"myDiagramDiv");
  }
 
}
