import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as go from 'gojs';




@Component({
  selector: 'app-equipment-distribution',
  templateUrl: './equipment-distribution.component.html'
})
export class EquipmentDistributionComponent implements OnInit, AfterViewInit {
  public diagram: go.Diagram = null;

  /***********************VARIABLES LOCALES**************** */
  @Input() model: go.TreeModel;

  constructor() { }

  ngOnInit(): void {
    const $ = go.GraphObject.make;
    this.diagram = $(go.Diagram, 'myDiagramDiv', {
      layout:
        $(go.TreeLayout,
          {
            isOngoing: true,
            treeStyle: go.TreeLayout.StyleLastParents,
            arrangement: go.TreeLayout.ArrangementHorizontal,
            // properties for most of the tree:
            angle: 90,
            layerSpacing: 35,
            // properties for the "last parents":
            alternateAngle: 90,
            alternateLayerSpacing: 35,
            alternateAlignment: go.TreeLayout.AlignmentBus,
            alternateNodeSpacing: 20
          }),
      'undoManager.isEnabled': true
    }
  );

    this.diagram.model = this.model;
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //this.diagram = $(go.Diagram, 'myDiagramDiv');

    //this.diagram.model = this.model;
  }

  ngAfterViewInit() {
    console.log(this.model);



  }

}
