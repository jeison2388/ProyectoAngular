import { Component, OnInit, Input } from '@angular/core';
import { CompetitionService } from '../../../competition.service';

@Component({
  selector: 'app-programming',
  templateUrl: './programming.component.html',
  styleUrls: ['./programming.component.scss']
})
export class ProgrammingComponent implements OnInit {
  
  competition:any;
  fechaInicio:Date;
  tipoCompeticion:string;
  constructor(private competitionService:CompetitionService) { }

  ngOnInit() {
   
  }
  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    if(this.competitionService.idSelected!=0)
    {
      this.competition=this.competitionService.competenciaSeleccionada();
      this.fechaInicio=this.competition.fechaInicio;
      this.tipoCompeticion=this.competition.tipoCompeticion.descripcion;
    }
  }

}
