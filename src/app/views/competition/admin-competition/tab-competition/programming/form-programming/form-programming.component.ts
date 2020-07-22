import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { FechaUtilidades } from '../../../../../../model/FechaUtilidades';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CompetitionService } from '../../../../competition.service';
import { Time } from '@angular/common';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-form-programming',
  templateUrl: './form-programming.component.html',
  styleUrls: ['./form-programming.component.scss']
})
export class FormProgrammingComponent implements OnInit,DoCheck {  
  @Input() fechaInicio:Date;
  @Input() tipoCompeticion:string;
  competition:any;
  idSelected=0;
  form:FormGroup;
  constructor(private competitionService:CompetitionService, private FormBuilder:FormBuilder) { 
    this.buildForm();
  }//https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time

  ngOnInit() 
  {
     
  }
  private buildForm() {
    this.form= this.FormBuilder.group({
      fechaInicio:[this.fechaInicio,[Validators.required]],
      tipoCompeticion:[this.tipoCompeticion,[Validators.required]],
      horaInicio:['',[Validators.required]],
      horaFin:['',[Validators.required]]
    });
/* this.form.valueChanges.pipe(
      debounceTime(350)
      ).subscribe(
        value=>{
          console.log(value);          
        }
      ) */
}
ngDoCheck(): void {
  //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
  //Add 'implements DoCheck' to the class.
  if(this.competitionService.idSelected!=0)
  {
    console.log("PROGRAMING. COMPETENCIA SELECCIONADA",this.competitionService);
   this.competition=this.competitionService.competenciaSeleccionada();
   this.idSelected=this.competition.id;
   this.form.controls['fechaInicio'].setValue(this.competition.fechaInicio);
   this.form.controls['tipoCompeticion'].setValue(this.competition.tipoCompeticion);
  }
}

  

}
