import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../servicios/data.service';
import { NotifierService } from 'angular-notifier';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-programador',
  templateUrl: './programador.component.html'
})
export class ProgramadorComponent implements OnInit {
  fieldsForm: FormGroup;

  title: string;
  subtitle: string;

  nameBtnBack: string;

  srcPhotoView: any;

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
    this.title = 'PROGRAMADOR';
    this.subtitle = 'Programador';
    this.nameBtnBack = 'Regresar';

    this.notifier = notifierService;
  }

  ngOnInit() {}

  onSubmit() {}
}
