import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

import { AutoGestionInstructoresRoutingModule } from './autoGestionInstructores-routing.module';

import { NivelesComponent } from './inscritos/niveles.component';
import { GruposComponent } from './inscritos/grupos/grupos.component';
import { ListInscritosComponent } from './inscritos/grupos/list-inscritos/inscritos.component';

import { AgendaComponent } from './agenda/agenda.component';
import { ProgramadorComponent } from './programador/programador.component';
import { GestionarGruposComponent } from './gestionarGrupos/gestionarGrupos.component';
import { HistorialComponent } from './historial/historial.component';

import { TarjetaGruposComponent } from './gestionarGrupos/tarjetaGrupos/tarjetaGrupos.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { DataService } from '../../servicios/data.service';
import { UtilService } from '../../servicios/util.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalWindowsModule } from '../modal-windows/modal-windows.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { AutoGestionInstructoresComponent } from './autoGestionInstructores.component';

/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {};

@NgModule({
  declarations: [
    AutoGestionInstructoresComponent,
    NivelesComponent,
    GruposComponent,
    ListInscritosComponent,
    AgendaComponent,
    ProgramadorComponent,
    GestionarGruposComponent,
    HistorialComponent,
    TarjetaGruposComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    AutoGestionInstructoresRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgSelectModule,
    NotifierModule.withConfig(customNotifierOptions),
    ModalWindowsModule,
    ModalModule.forRoot()
  ],
  providers: [DataService, UtilService, { provide: Location }],
  entryComponents: []
})
export class AutoGestionInstructoresModule { }
