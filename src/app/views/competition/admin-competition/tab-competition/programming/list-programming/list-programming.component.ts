import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-programming',
  templateUrl: './list-programming.component.html',
  styleUrls: ['./list-programming.component.scss']
})
export class ListProgrammingComponent implements OnInit {
@Input() fechaInicio:Date;
@Input() tipoCompeticion:string;
  constructor() { }

  ngOnInit() {
  }

}
