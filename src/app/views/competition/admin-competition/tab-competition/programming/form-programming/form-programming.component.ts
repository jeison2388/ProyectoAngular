import { Component, OnInit, Input } from '@angular/core';
import { FechaUtilidades } from '../../../../../../model/FechaUtilidades';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CompetitionService } from '../../../../competition.service';
import { Time } from '@angular/common';

@Component({
  selector: 'app-form-programming',
  templateUrl: './form-programming.component.html',
  styleUrls: ['./form-programming.component.scss']
})
export class FormProgrammingComponent implements OnInit {
  @Input() fechaInicio:Date;
  @Input() tipoCompeticion:string;
  hInicio:string;
  mInicio:string;
  hFin:string;
  mFin:string;
  horaInicio:Time;
  horaFin:Time;
  constructor(private competitionService:CompetitionService) { 
    
  }//https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time

  ngOnInit() {
    if(this.horaInicio!=null){
      if((this.horaInicio.hours+1)<18)
      {
        this.horaFin.hours=this.horaInicio.hours+1;
        console.log("HORA NO ES NULL");
      }
      
    else
    {
      this.horaFin.hours=this.horaInicio.hours;
      console.log("HORA ES NULL AUN ");
    }
    
    }
    }
  

}
