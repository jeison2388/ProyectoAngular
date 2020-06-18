import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

import { AutoGestionAfiliadosRoutingModule } from './autoGestionAfiliados-routing.module';
import { TarjetaInfoAfiliadoComponent } from './tarjetaInfoAfiliado/tarjetaInfoAfiliado.component';
import { AutoGestionAfiliadosComponent } from './autoGestionAfiliados.component';
import { InscripcionVacacionesRecComponent } from './inscripcionVacacionesRec/inscripcionVacacionesRec.component';
import { InscripcionEsfoderComponent } from './inscripcionEsfoder/inscripcionEsfoder.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { DataService } from '../../servicios/data.service';
import { UtilService } from '../../servicios/util.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalWindowsModule } from '../modal-windows/modal-windows.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InscripcionVacRecreativas } from './inscripcionVacacionesRec/inscripcionVacacionesRec.service';
import { TarjetaAfiliado } from './tarjetaInfoAfiliado/tarjetaInfoAfiliado.service';
import { InscripcionEsfoder } from './inscripcionEsfoder/inscripcionEsfoder.service';

/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {};

@NgModule({
  declarations: [
    AutoGestionAfiliadosComponent,
    TarjetaInfoAfiliadoComponent,
    InscripcionVacacionesRecComponent,
    InscripcionEsfoderComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    AutoGestionAfiliadosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgSelectModule,
    NotifierModule.withConfig(customNotifierOptions),
    ModalWindowsModule,
    ModalModule.forRoot()
  ],
  providers: [DataService, UtilService, InscripcionVacRecreativas, TarjetaAfiliado, InscripcionEsfoder, { provide: Location }],
  entryComponents: []
})
export class AutoGestionAfiliadosModule {}
