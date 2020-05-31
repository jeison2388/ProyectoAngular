import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as go from 'gojs';




@Component({
  selector: 'app-equipment-distribution',
  templateUrl: './equipment-distribution.component.html'
})
export class EquipmentDistributionComponent implements OnInit, AfterViewInit {
  public diagram: go.Diagram = null;
  bluegrad = '#90CAF9';
  pinkgrad = '#F48FB1';
  /***********************VARIABLES LOCALES**************** */
  @Input() nodeDataArray: [];
  
   
  constructor() { }

  ngOnInit(): void {
    const $ = go.GraphObject.make;
    this.diagram = $(go.Diagram, 'myDiagramDiv', 
    {
      layout:
        $(go.TreeLayout,
          { 
            isOngoing: true,
            treeStyle: go.TreeLayout.StyleLastParents,
            arrangement: go.TreeLayout.ArrangementHorizontal,
            // properties for most of the tree:
            angle: 90,
            layerSpacing: 35,
            layerStyle:go.TreeLayout.LayerUniform,
            // properties for the "last parents":
            alternateAngle: 90,
            alternateLayerSpacing: 35,
            alternateAlignment: go.TreeLayout.AlignmentBus,
            alternateNodeSpacing: 20
          })         
    }
  );

  this.diagram.add(
    $(go.Part, "Table",
      { position: new go.Point(300, 10), selectable: false },
      $(go.TextBlock, "Key",
        { row: 0, font: "700 14px Droid Serif, sans-serif" }),  // end row 0
      $(go.Panel, "Horizontal",
        { row: 1, alignment: go.Spot.Left },
        $(go.Shape, "Rectangle",
          { desiredSize: new go.Size(30, 30), fill: this.bluegrad, margin: 5 }),
        $(go.TextBlock, "Cuartos",
          { font: "700 13px Droid Serif, sans-serif" })
      ),  // end row 1
      $(go.Panel, "Horizontal",
        { row: 2, alignment: go.Spot.Left },
        $(go.Shape, "Rectangle",
          { desiredSize: new go.Size(30, 30), fill: this.pinkgrad, margin: 5 }),
        $(go.TextBlock, "Octavos",
          { font: "700 13px Droid Serif, sans-serif" })
      ) , // end row 2,
      $(go.Panel, "Horizontal",
      { row: 2, alignment: go.Spot.Left },
      $(go.Shape, "Rectangle",
        { desiredSize: new go.Size(30, 30), fill: this.pinkgrad, margin: 5 }),
      $(go.TextBlock, "Semifinal",
        { font: "700 13px Droid Serif, sans-serif" })
    ),  // end row 2 
    $(go.Panel, "Horizontal",
    { row: 2, alignment: go.Spot.Left },
    $(go.Shape, "Rectangle",
      { desiredSize: new go.Size(30, 30), fill: this.pinkgrad, margin: 5 }),
    $(go.TextBlock, "Final",
      { font: "700 13px Droid Serif, sans-serif" })
  )  // end row 2
    ));

    this.diagram.linkTemplate =
    $(go.Link,  // the whole link panel
      { routing: go.Link.Orthogonal, corner: 5, selectable: false },
      $(go.Shape, { strokeWidth: 3, stroke: '#424242' }));  // the gray link shape
      var tooltiptemplate =
      $("ToolTip",
        { "Border.fill": "whitesmoke", "Border.stroke": "black" },
        $(go.TextBlock,
          {
            font: "bold 8pt Helvetica, bold Arial, sans-serif",
            wrap: go.TextBlock.WrapFit,
            margin: 5
          },
          new go.Binding("text", "", this.tooltipTextConverter))
      );

   // replace the default Node template in the nodeTemplateMap
   this.diagram.nodeTemplate =
   $(go.Node, "Auto",
     { deletable: false, toolTip: tooltiptemplate },
     new go.Binding("text", "name"),
     $(go.Shape, "Rectangle",
       {
         fill: "lightgray",
         stroke: null, strokeWidth: 0,
         stretch: go.GraphObject.Fill,
         alignment: go.Spot.Center
       },
       new go.Binding("fill", "gender", this.genderBrushConverter)),
     $(go.TextBlock,
       {
         font: "700 12px Droid Serif, sans-serif",
         textAlign: "center",
         margin: 10, maxSize: new go.Size(80, NaN)
       },
       new go.Binding("text", "name"))
   );
    // define the Link template
    this.diagram.linkTemplate =
    $(go.Link,  // the whole link panel
      { routing: go.Link.Orthogonal, corner: 5, selectable: false },
      $(go.Shape, { strokeWidth: 3, stroke: '#424242' }));  // the gray link shape
    this.diagram.model = new go.TreeModel(this.nodeDataArray);

  }
  

  ngAfterViewInit() {
   
  }


  //FUNCIONES DE LA LIBRERIA
  tooltipTextConverter(person):string {
    let str = "";
    str += "Born: " + person.birthYear;
    if (person.deathYear !== undefined) str += "\nDied: " + person.deathYear;
    if (person.reign !== undefined) str += "\nReign: " + person.reign;
    return str;
  }



  // Recibe un género y dependiendo del que sea lo pinta
  genderBrushConverter(gender) {
    if (gender === "Octavos") return "blue";
    //this.bluegrad; ese color se define en los atributos
    if (gender === "Cuartos") return "red";
    if (gender === "Semifinal") return "white";
    if (gender === "Final") return "green";
    return "orange";
  }


}
