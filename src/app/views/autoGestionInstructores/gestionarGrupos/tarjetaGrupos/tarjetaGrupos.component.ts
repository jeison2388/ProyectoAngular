import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../servicios/data.service';
import { NotifierService } from 'angular-notifier';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-tarjetaGrupos',
  templateUrl: './tarjetaGrupos.component.html'
})
export class TarjetaGruposComponent implements OnInit {
  /*********************VARIABLE GLOBALE***************** */
  fieldsForm: FormGroup;

  /******************
   * NOTIFICACIONES *
   ******************/
  public readonly notifier: NotifierService;

  constructor(
    private formBuilder: FormBuilder,
    public dataService: DataService,
    public notifierService: NotifierService,
    sanitizer: DomSanitizer,
    public router: Router,
    public _location: Location
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {}

  onSubmit() {}
}
