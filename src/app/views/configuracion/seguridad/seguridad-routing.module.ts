import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { PerfilesComponent } from './perfil/perfiles.component';
import { RecursoComponent } from './recurso/recurso.component';
import { RecursosComponent } from './recurso/recursos.component';
import { PermisoComponent } from './permiso/permiso.component';
import { PermisosComponent } from './permiso/permisos.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuariosComponent } from './usuario/usuarios.component';
import { UsuariopubComponent } from './usuario/usuariopub.component';


/********************
 * RUTAS DEL MODULO *
 ********************/
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Configuración  /  Seguridad'
    },
    children: [
      {
        path: '',
        redirectTo: 'seguridad'
      },
     {//------------------------------------
        path: 'rol',
        component: PerfilComponent,
        data: {
          title: 'Rol'
        }
      },
      {//------------------------------------
        path: 'roles',
        component: PerfilesComponent,
        data: {
          title: 'Roles'
        }
      },
       {//------------------------------------
        path: 'recurso',
        component: RecursoComponent,
        data: {
          title: 'Recurso'
        }
      },
      {//------------------------------------
        path: 'recursos',
        component: RecursosComponent,
        data: {
          title: 'Recursos'
        }
      },
       {//------------------------------------
        path: 'permiso',
        component: PermisoComponent,
        data: {
          title: 'Permiso'
        }
      },
      {//------------------------------------
        path: 'permisos',
        component: PermisosComponent,
        data: {
          title: 'Permisos'
        }
      },
      {//------------------------------------
        path: 'usuario',
        component: UsuarioComponent,
        data: {
          title: 'Usuario'
        }
      },
      {//------------------------------------
        path: 'usuarios',
        component: UsuariosComponent,
        data: {
          title: 'Usuarios'
        }
      },
      {//------------------------------------
        path: 'usuariopub',
        component: UsuariopubComponent,
        data: {
          title: 'Cambiar clave'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
