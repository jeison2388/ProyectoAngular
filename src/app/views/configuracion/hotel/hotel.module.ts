import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';
import { CamasComponent } from './camas/camas.component';
import { HabitacionComponent } from './habitaciones/habitacion.component';
import { CamaComponent } from './camas/cama.component';
import { NotifierOptions, NotifierModule } from 'angular-notifier';
import { HotelRoutingModule } from './hotel-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectModule } from 'ng-select';
import { DataService } from '../../../servicios/data.service';

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
    HabitacionesComponent, 
    CamasComponent, 
    HabitacionComponent, 
    CamaComponent
  ],
  imports: [
    CommonModule,
    HotelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgbModule,
    SelectModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  providers:[
    DataService,
    {provide: Location},
  ]
})
export class HotelModule { }
