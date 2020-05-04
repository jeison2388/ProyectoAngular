import { Component, OnInit } from '@angular/core';
import { DataService } from '../../servicios/data.service';
import { NotifierService } from 'angular-notifier';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-autoGestionAfiliados',
  templateUrl: './autoGestionAfiliados.component.html'
})
export class AutoGestionAfiliadosComponent implements OnInit {
  titleListInstructores: string;
  subtitleListInstructores: string;
  nameBtnAdd: string;
  nameBtnEdit: string;
  nameBtnCancel: string;

  /******************
   * NOTIFICACIONES *
   ******************/
  public readonly notifier: NotifierService;

  constructor(
    public dataService: DataService,
    public notifierService: NotifierService,
    public router: Router,
    public _location: Location
  ) {
    this.titleListInstructores = 'ESCUELA DE FORMACIÓN DEPORTIVA';
    this.subtitleListInstructores = 'Instructores';
    this.nameBtnAdd = 'Nuevo';
    this.nameBtnEdit = 'Editar';
    this.nameBtnCancel = 'Cancelar';

    this.notifier = notifierService;
  }

  ngOnInit() {}


}
