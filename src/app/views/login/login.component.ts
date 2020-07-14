import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { SeguridadService } from '../../servicios/seguridad.service';
import { Md5 } from 'ts-md5/dist/md5';


@Component({
   selector: 'app-dashboard',
   templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

   // model: ILogin = { userid: "admnin", password: "admin@123" }
   loginForm: FormGroup;
   message: string;
   returnUrl: string;
   submitted = false;

   usuario: any;

   constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authService: AuthService,
      public seguridadService: SeguridadService,
   ) { }

   ngOnInit() {
      this.loginForm = this.formBuilder.group({
         userid: ['', Validators.required],
         password: ['', Validators.required]
      });
      this.returnUrl = '/dashboard';
      this.authService.logout();
   }

   // convenience getter for easy access to form fields
   get f() { return this.loginForm.controls; }


   login() {

      const md5 = new Md5();


      this.seguridadService.login(this.f.userid.value, md5.appendStr(this.f.password.value).end())
         .subscribe((data: any) => {

            let ok = false;

            if (data !== null) {
               this.usuario = {
                  id: data.id,
                  identificacion: data.idPersona.identificacion,
                  nombres: data.idPersona.primerNombre,
                  apellidos: data.idPersona.primerApellido,
                  login: data.usuario,
                  empresa: 'Comfacauca',
                  perfil: data.idRol.descripcion,
                  establecimiento: 'Recreación',
                  empresa_cod: 'CCF014',
                  empresa_id: '1',
                  id_perfil: data.idRol.id
               };
               ok = true;
            }


            if (this.loginForm.invalid) {
               return;
            } else {
               if (ok) {
                  localStorage.setItem('isLoggedIn', 'true');
                  localStorage.setItem('token', this.f.userid.value);
                  localStorage.setItem('empresa', 'Comfacauca');
                  localStorage.setItem('id_perfil', this.usuario.id_perfil);
                  localStorage.setItem('perfil', this.usuario.perfil);
                  localStorage.setItem('establecimiento', this.usuario.establecimiento);
                  localStorage.setItem('nombre', this.usuario.nombres + ' ' + this.usuario.apellidos);
                  localStorage.setItem('empresa_cod', this.usuario.empresa_cod);
                  localStorage.setItem('id_usuario', this.usuario.id);
                  localStorage.setItem('empresa_id', this.usuario.empresa_id);
                  this.router.navigate([this.returnUrl]);
               } else {
                  this.message = 'El nombre de usuario o clave no existen';
               }
            }


         },
            error => {
               console.log('There was an error while retrieving data !!!' + error);
            });



   }



}
