import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarifasRoutingModule } from './tarifas-routing.module';
import { ServiciosComponent } from './servicios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../servicios/data.service';
import { DataTablesModule } from 'angular-datatables';
import { UpperDirective } from '../../shared/upper-case-directive';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
//import { NgSelectModule } from '@ng-select/ng-select';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServicioComponent } from './servicio.component';
import { AperturaComponent } from './apertura.component';
import {SelectModule} from 'ng-select';



/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'right',
			distance: 12
		},
		vertical: {
			position: 'top',
			distance: 12,
			gap: 10
		}
  },
}


@NgModule({
  declarations: [
    ServiciosComponent,
    AperturaComponent,
    UpperDirective,
    ServicioComponent,
  ],
  imports: [
    CommonModule,
    TarifasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
   // NgSelectModule,
    NgbModule,
    SelectModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  providers:[
    DataService
  ]
})
export class TarifasModule { }
