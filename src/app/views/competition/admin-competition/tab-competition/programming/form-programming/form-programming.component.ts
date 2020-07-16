import { Component, OnInit, Input } from '@angular/core';
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
export class FormProgrammingComponent implements OnInit {
  
  @Input() fechaInicio:Date;
  @Input() tipoCompeticion:string;
  min_date:Date;
  form:FormGroup;
  hInicio:string;
  mInicio:string;
  hFin:string;
  mFin:string;
  horaInicio:Time;
  horaFin:Time;
  constructor(private competitionService:CompetitionService, private formBuilder:FormBuilder ) { 
    this.buildForm();
  }
  //https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time

  ngOnInit() {}
    buildForm() {
    this.form=  this.formBuilder.group(
      {
        fInicio:['5/09/1993',[Validators.required]],
        tipoCompeticion:['',[Validators.required]],
        hInicio:['',[Validators.required]],
        hFin:['',[Validators.required]]
      }
    );
    this.form.valueChanges.pipe(
      debounceTime(350)
      ).subscribe(
        value=>{
          console.log(value);          
        }
      )

    }
    getfInicio()
    {
      return this.form.get('fInicio');
    }
    getTipoCompeticion()
    {
      return this.form.get('tipoCompeticion');
    }
    getHInicio()
    {
      return this.form.get('hInicio');
    }
    getHFin()
    {
      return this.form.get('hFin');
    }

  

}
