import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';
import { HabitacionComponent } from './habitaciones/habitacion.component';
import { CamaComponent } from './camas/cama.component';
import { CamasComponent } from './camas/camas.component';


/********************
 * RUTAS DEL MODULO *
 ********************/
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Configuración  /  Hotel'
    },
    children: [
      {
        path: '',
        redirectTo: 'hotel'
      },
      {//------------------------------------
        path: 'habitaciones',
        component: HabitacionesComponent,
        data: {
          title: 'Habitaciones'
        }
      },
      {
        path: 'habitacion',
        component: HabitacionComponent,
        data: {
          title: 'Habitación'
        }
      },
      {//----------------------------------
        path: 'camas',
        component: CamasComponent,
        data: {
          title: 'Camas'
        }
      },
      {
        path: 'cama',
        component: CamaComponent,
        data: {
          title: 'Cama'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelRoutingModule { }
