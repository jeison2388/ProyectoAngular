import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../servicios/data.service';
import { NotifierService } from 'angular-notifier';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UtilAutoGestionAfiliados } from '../UtilAutoGestionAfiliados';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-tarjetaInfoAfiliado',
  templateUrl: './tarjetaInfoAfiliado.component.html'
})
export class TarjetaInfoAfiliadoComponent implements OnInit {
  /*********************VARIABLE GLOBALE***************** */
  fieldsForm: FormGroup;
  utilAutoGestionAfiliados: UtilAutoGestionAfiliados;


  filePhoto: File;
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
    this.utilAutoGestionAfiliados = new UtilAutoGestionAfiliados();
    this.notifier = notifierService;
    this.srcPhotoView = '../../../../assets/img/competicion/addPhoto.png';
  }

  ngOnInit() {}

  onSubmit() {}
}
