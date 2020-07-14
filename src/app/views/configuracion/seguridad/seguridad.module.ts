import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { SelectModule } from 'ng-select';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { DataService } from '../../../servicios/data.service';
import { UtilService } from '../../../servicios/util.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { SeguridadRoutingModule } from './seguridad-routing.module';
import { PerfilesComponent } from './perfil/perfiles.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RecursosComponent } from './recurso/recursos.component';
import { RecursoComponent } from './recurso/recurso.component';
import { PermisosComponent } from './permiso/permisos.component';
import { PermisoComponent } from './permiso/permiso.component';
import { UsuariosComponent } from './usuario/usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UpperDirective } from '../../../shared/upper-case-directive';
import { UsuariopubComponent } from './usuario/usuariopub.component';


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
   PerfilesComponent,
   PerfilComponent,
   RecursoComponent,
   RecursosComponent, 
   PermisosComponent,
   PermisoComponent,
   UsuariosComponent,
   UsuarioComponent,
   UsuariopubComponent,
   UpperDirective
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgbModule,
     NgSelectModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  providers:[
    DataService,
    UtilService,
    {provide: Location},
  ]
})
export class SeguridadModule { }
