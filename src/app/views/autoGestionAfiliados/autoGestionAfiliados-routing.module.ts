import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutoGestionAfiliadosComponent } from './autoGestionAfiliados.component';
import { InscripcionVacacionesRecComponent } from './inscripcionVacacionesRec/inscripcionVacacionesRec.component';
import { InscripcionEsfoderComponent } from './inscripcionEsfoder/inscripcionEsfoder.component';
/********************
 * RUTAS DEL MODULO *
 ********************/
const routes: Routes = [
  {
    path: 'autoGestionAfiliados',
    component: AutoGestionAfiliadosComponent,
    data: {
      title: 'Autogestión de afiliados'
    }
  },
  {
    path: 'inscripcionVacacionesRec',
    component: InscripcionVacacionesRecComponent,
    data: {
      title: 'Inscripción Vacaciones Recreativas'
    }
  },
  {
    path: 'inscripcionEsfoder',
    component: InscripcionEsfoderComponent,
    data: {
      title: 'Inscripción Vacaciones Recreativas'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutoGestionAfiliadosRoutingModule {}
