import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ServiciosComponent } from './servicios.component';
import { ServicioComponent } from './servicio.component';
import { AperturaComponent } from './apertura.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Tarifas'
    },
    children: [
      {
        path: '',
        redirectTo: 'tarifas'
      },
      {
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
      {
        path: 'apertura',
        component: AperturaComponent,
        data: {
          title: 'Apertura'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarifasRoutingModule { }
