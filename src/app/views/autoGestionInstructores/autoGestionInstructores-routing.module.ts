import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutoGestionInstructoresComponent } from './autoGestionInstructores.component';

import { NivelesComponent } from './inscritos/niveles.component';
import { GruposComponent } from './inscritos/grupos/grupos.component';
import { ListInscritosComponent } from './inscritos/grupos/list-inscritos/inscritos.component';

import { AgendaComponent } from './agenda/agenda.component';
import { ProgramadorComponent } from './programador/programador.component';
import { GestionarGruposComponent } from './gestionarGrupos/gestionarGrupos.component';
import { HistorialComponent } from './historial/historial.component';

/********************
 * RUTAS DEL MODULO *
 ********************/
const routes: Routes = [
  {
    path: 'autoGestionInstructores',
    component: AutoGestionInstructoresComponent,
    data: {
      title: 'Autogestión de Instructores'
    }
  },
  {
    path: 'inscritos',
    component: NivelesComponent,
    data: {
      title: 'Ver Inscripciones ESFODER'
    }
  },
  {
    path: 'grupos',
    component: GruposComponent,
    data: {
      title: 'Ver Inscripciones ESFODER'
    }
  },
  {
    path: 'list-inscritos',
    component: ListInscritosComponent,
    data: {
      title: 'Ver Inscripciones ESFODER'
    }
  },
  {
    path: 'agenda',
    component: AgendaComponent,
    data: {
      title: 'Administrar Agenda'
    }
  },
  {
    path: 'programador',
    component: ProgramadorComponent,
    data: {
      title: 'Ver Programador'
    }
  },
  {
    path: 'gestionarGrupos',
    component: GestionarGruposComponent,
    data: {
      title: 'Gestionar Grupos ESFODER'
    }
  },
  {
    path: 'historial',
    component: HistorialComponent,
    data: {
      title: 'Historial Deportista'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutoGestionInstructoresRoutingModule {}
