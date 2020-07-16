import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { InfraestructurasComponent } from './infraestructuras/infraestructuras.component';
import { InfraestructuraComponent } from './infraestructuras/infraestructura.component';
import { EscenariosComponent } from './escenarios/escenarios.component';
import { EscenarioComponent } from './escenarios/escenario.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ServicioComponent } from './servicios/servicio.component';
import { TemporadasComponent } from './temporadas/temporadas.component';
import { TemporadaComponent } from './temporadas/temporada.component';
import { AperturasComponent } from './aperturas/aperturas.component';
import { AperturaComponent } from './aperturas/apertura.component';
import { TarifasComponent } from './tarifas/tarifas.component';
import { TarifaComponent } from './tarifas/tarifa.component';
import { TaquillasRoutingModule } from './taquillas-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { DataService } from '../../../servicios/data.service';
import { UtilService } from '../../../servicios/util.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMaskModule, IConfig } from 'ngx-mask';

/*
const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false
  };
};
*/
/*
export const options: Partial<IConfig> = {
  thousandSeparator: ','
};
*/

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
    InfraestructurasComponent, 
    InfraestructuraComponent, 
    EscenariosComponent, 
    EscenarioComponent, 
    ServiciosComponent, 
    ServicioComponent, 
    TemporadasComponent, 
    TemporadaComponent, 
    AperturasComponent, 
    AperturaComponent, 
    TarifasComponent,
    TarifaComponent],
  imports: [
    CommonModule,
    TaquillasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgbModule,
    NgSelectModule,
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(),
    NotifierModule.withConfig(customNotifierOptions)
  ],
  providers:[
    DataService,
    UtilService,
    {provide: Location},
  ]
})
export class TaquillasModule { }
