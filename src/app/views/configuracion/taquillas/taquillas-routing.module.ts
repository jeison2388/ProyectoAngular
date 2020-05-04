import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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


/********************
 * RUTAS DEL MODULO *
 ********************/
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Configuración  /  Taquillas'
    },
    children: [
      {
        path: '',
        redirectTo: 'taquillas'
      },
      {//------------------------------------
        path: 'infraestructuras',
        component: InfraestructurasComponent,
        data: {
          title: 'Infraestructuras'
        }
      },
      {
        path: 'infraestructura',
        component: InfraestructuraComponent,
        data: {
          title: 'Infraestructura'
        }
      },
      {
        path: 'infraestructura/:id',
        component: InfraestructuraComponent,
        data: {
          title: 'Infraestructura'
        }
      },
      {//----------------------------------
        path: 'escenarios',
        component: EscenariosComponent,
        data: {
          title: 'Escenarios'
        }
      },
      {
        path: 'escenario',
        component: EscenarioComponent,
        data: {
          title: 'Escenario'
        }
      },
      {//----------------------------------
        path: 'servicios',
        component: ServiciosComponent,
        data: {
          title: 'Servicios'
        }
      },
      {
        path: 'servicio',
        component: ServicioComponent,
        data: {
          title: 'Servicio'
        }
      }, 
      {//----------------------------------
        path: 'temporadas',
        component: TemporadasComponent,
        data: {
          title: 'Temporadas'
        }
      },
      {
        path: 'temporada',
        component: TemporadaComponent,
        data: {
          title: 'Temporada'
        }
      },
      {
        path: 'temporada:/id',
        component: TemporadaComponent,
        data: {
          title: 'Temporada'
        }
      },    
      {//----------------------------------
        path: 'aperturas',
        component: AperturasComponent,
        data: {
          title: 'Aperturas'
        }
      },
      {
        path: 'apertura',
        component: AperturaComponent,
        data: {
          title: 'Apertura'
        }
      },  
      {//----------------------------------
        path: 'tarifas',
        component: TarifasComponent,
        data: {
          title: 'Tarifas'
        }
      },
      {
        path: 'tarifa',
        component: TarifaComponent,
        data: {
          title: 'Tarifa'
        }
      },  
        
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaquillasRoutingModule { }
