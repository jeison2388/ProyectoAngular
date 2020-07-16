import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos/productos.component';
import { CotizacionesRoutingModule } from './cotizaciones-routing.module';
import { ProductoComponent } from './productos/producto.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BandejasComponent } from './bandeja/bandejas.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UsuariosasigComponent } from './bandeja/usuariosasig.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { FileUploadModule } from 'ng2-file-upload';

/*
const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};*/

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
};


@NgModule({
  declarations: [
    ProductosComponent,
    ProductoComponent,
    CotizacionComponent,
    BandejasComponent,
    UsuariosasigComponent
  ],
  imports: [
    CommonModule,
    CotizacionesRoutingModule,
    DataTablesModule,
    FormsModule,
    TabsModule,
    FileUploadModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NotifierModule.withConfig(customNotifierOptions)
  ],
  exports: [
    UsuariosasigComponent
  ]
})
export class CotizacionesModule { }
