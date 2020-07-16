import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { ProductoComponent } from './productos/producto.component';
import { BandejasComponent } from './bandeja/bandejas.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';


/********************
 * RUTAS DEL MODULO *
 ********************/
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Operaciones  /  Cotizaciones'
    },
    children: [
      {
        path: '',
        redirectTo: 'operaciones'
      },
      {// ------------------------------------
        path: 'productos',
        component: ProductosComponent,
        data: {
          title: 'Productos'
        }
      },
      {
        path: 'producto',
        component: ProductoComponent,
        data: {
          title: 'Producto'
        }
      },
      {
        path: 'producto/:id',
        component: ProductoComponent,
        data: {
          title: 'Producto'
        }
      },
      {// ------------------------------------
        path: 'bandejas',
        component: BandejasComponent,
        data: {
          title: 'Bandejas'
        }
      },
      {
        path: 'cotizacion',
        component: CotizacionComponent,
        data: {
          title: 'Cotización'
        }
      },
      {
        path: 'cotizacion/:id',
        component: CotizacionComponent,
        data: {
          title: 'Cotización'
        }
      }
    ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotizacionesRoutingModule { }
