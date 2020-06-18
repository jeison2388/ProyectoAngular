import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../servicios/data.service';
import { NotifierService } from 'angular-notifier';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { InscripcionVacRecreativas } from './inscripcionVacacionesRec.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-inscripcionVacacionesRec',
  templateUrl: './inscripcionVacacionesRec.component.html'
})
export class InscripcionVacacionesRecComponent implements OnInit {
  fieldsForm: FormGroup;

  titleListInstructores: string;
  subtitleListInstructores: string;
  nameBtnAdd: string;
  nameBtnCancel: string;

  srcPhotoView: any;
  tipos: any;
  programa: any;
  @ViewChild('tipo', { static: false }) cbx_tipo: any;

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
    public _location: Location,
    private inscripcion: InscripcionVacRecreativas
  ) {
    this.titleListInstructores = 'ESCUELA DE FORMACIÓN DEPORTIVA';
    this.subtitleListInstructores = 'Instructores';
    this.nameBtnAdd = 'Nuevo';
    this.nameBtnCancel = 'Cancelar';

    this.notifier = notifierService;
    this.srcPhotoView = '../../../../assets/img/competicion/addPhoto.png';

    this.inscripcion.cargarTiposIdentificacion().subscribe(resultado => {this.tipos = resultado; },
      error => { console.log(JSON.stringify(error)); });
    this.inscripcion.cargarProgramaVacacionRecreativa().subscribe(resultado => {this.programa = resultado; },
      error => { console.log(JSON.stringify(error)); });
  }

  ngOnInit() {
    this.fieldsForm = this.formBuilder.group({
      nombreMadre: [''],
      direccion: [''],
      celular: [''],
      Correo: [''],
      nombresResponsable: [''],
      identificacionResponsable: [''],
      celularResponsable: [''],
      direccionResponsable: [''],
      telefonoResponsable: [''],
      recomendaciones: ['']
    });
  }

  onSubmit() {}
}
