import { Component, OnInit } from '@angular/core';
import { DataService } from '../../servicios/data.service';
import { NotifierService } from 'angular-notifier';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-autoGestionInstructores',
  templateUrl: './autoGestionInstructores.component.html'
})
export class AutoGestionInstructoresComponent implements OnInit {

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

    this.notifier = notifierService;
  }

  ngOnInit() {}


}
