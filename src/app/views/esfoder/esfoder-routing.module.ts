import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NivelesComponent } from './niveles/niveles.component';
import { InstructoresComponent } from './instructores/instructores.component';
import { EvaluacionesComponent } from './evaluacion-rendimiento/evaluaciones.component';
import { AddNivelesComponent } from './niveles/add-niveles/add-niveles.component';
import { EditNivelesComponent } from './niveles/edit-niveles/edit-niveles.component';
import { AddInstructoresComponent } from './instructores/add-instructores/add-instructores.component';
import { AddEvaluacionesComponent } from './evaluacion-rendimiento/add-evaluaciones/add-evaluaciones.component';
import { EditEvaluacionesComponent } from './evaluacion-rendimiento/edit-evaluaciones/edit-evaluaciones.component';
import { from } from 'rxjs';

/********************
 * RUTAS DEL MODULO *
 ********************/
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'ESFODER'
    },
    children: [
      {
        path: '',
        redirectTo: 'esfoder'
      },
      {
        path: 'niveles',
        component: NivelesComponent,
        data: {
          title: 'Niveles'
        }
      },
      {
        path: 'add-niveles',
        component: AddNivelesComponent,
        data: {
          title: 'Niveles'
        }
      },
      {
        path: 'add-niveles:id',
        component: AddNivelesComponent,
        data: {
          title: 'Niveles'
        }
      },
      {
        path: 'edit-niveles',
        component: EditNivelesComponent,
        data: {
          title: 'Niveles'
        }
      },
      {
        path: 'edit-niveles:id',
        component: EditNivelesComponent,
        data: {
          title: 'Niveles'
        }
      },
      {
        path: 'instructores',
        component: InstructoresComponent,
        data: {
          title: 'Instructores'
        }
      },
      {
        path: 'add-instructores',
        component: AddInstructoresComponent,
        data: {
          title: 'Instructores'
        }
      },
      {
        path: 'add-instructores:id',
        component: AddInstructoresComponent,
        data: {
          title: 'Niveles'
        }
      },
      {
        path: 'evaluacion-rendimiento',
        component: EvaluacionesComponent,
        data: {
          title: 'Evaluaciones de rendimiento'
        }
      },
      {
        path: 'add-evaluaciones',
        component: AddEvaluacionesComponent,
        data: {
          title: 'Evaluaciones de rendimiento'
        }
      },
      {
        path: 'edit-evaluaciones',
        component: EditEvaluacionesComponent,
        data: {
          title: 'Evaluaciones de rendimiento'
        }
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EsfoderRoutingModule { }
