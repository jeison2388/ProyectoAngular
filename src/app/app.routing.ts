import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { DummyComponent } from './shared/dummy.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: 'dummy',
    component: DummyComponent,
    data: {
      title: 'Dummy'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'autoGestionAfiliados',
        loadChildren: () => import('./views/autoGestionAfiliados/autoGestionAfiliados.module').then(m => m.AutoGestionAfiliadosModule)
      },
      {
        path: 'autoGestionInstructores',
        loadChildren: () => import('./views/autoGestionInstructores/autoGestionInstructores.module').
        then(m => m.AutoGestionInstructoresModule)
      },
      {
        path: 'esfoder',
        loadChildren: () => import('./views/esfoder/esfoder.module').then(m => m.EsfoderModule)
      },
      {
        path: 'competencias',
        loadChildren: () => import('./views/competition/competition.module').then(m => m.CompetitionModule)
      },
      {
        path: 'tarifas',
        loadChildren: () => import('./views/tarifas/tarifas.module').then(m => m.TarifasModule)
      },
      {
        path: 'taquillas',
        loadChildren: () => import('./views/configuracion/taquillas/taquillas.module').then(m => m.TaquillasModule)
      },
      {
        path: 'hotel',
        loadChildren: () => import('./views/configuracion/hotel/hotel.module').then(m => m.HotelModule)
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      },
      {
        path: 'seguridad',
        loadChildren: () => import('./views/configuracion/seguridad/seguridad.module').then(m => m.SeguridadModule)
      },
      {
        path: 'cotizaciones',
        loadChildren: () => import('./views/operaciones/cotizaciones/cotizaciones.module').then(m => m.CotizacionesModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
