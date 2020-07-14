import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbTimepickerConfig, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { DataService } from '../../../../servicios/data.service';
import { UtilService } from '../../../../servicios/util.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Md5 } from 'ts-md5/dist/md5';
import { IfStmt } from '@angular/compiler';
import { SeguridadService } from '../../../../servicios/seguridad.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  providers: [NgbTimepickerConfig]
})
export class UsuarioComponent implements OnInit {

  @ViewChild('foco', { static: true }) myInput: ElementRef;


  /********************************************************************
   * DECLARACIÓN VARIABLES DE TIPO TIME PARA EL SELECTOR DE HORARIOS *
   ********************************************************************/
  timeIni: NgbTimeStruct = { hour: 8, minute: 0, second: 0 };
  timeFin: NgbTimeStruct = { hour: 12, minute: 0, second: 0 };


  /**************************************
   * VARIABLES DEL FORMULARIO PRINCIPAL *
   **************************************/
  // Id formulario principal 
  pk = 0;

  submitted = false;
  value: any;
  perfiles: any[];
  tipos_identificacion: any[];
  loginaux = '';
  claveaux = '';



  /********************************************
   * DECLARA VARIABLE PARA LAS NOTIFICACIONES *
   ********************************************/
  public readonly notifier: NotifierService;

  constructor(config: NgbTimepickerConfig,
    public dataService: DataService,
    public utilService: UtilService,
    public notifierService: NotifierService,
    public seguridadService: SeguridadService,
    public router: Router,
    private route: ActivatedRoute, ) {


    // incicializa variable de las notificaciones
    this.notifier = notifierService;
    // this.validarPermiso(localStorage.getItem('id_perfil'));
  }

  ngOnInit() {
    // Inicializa el formulario reactivo principal
    this.initializeFormGroup();
    // Carga las listas de mostrar al inicio, combos especialmente
    this.cargarEntidades();

    /**********************************************************************
     * RECOGE LOS PARAMETROS DE LA URL Y TRAE LE OBJETO PARA MODO EDICIÓN *
     **********************************************************************/
    this.route
      .queryParams
      .subscribe(params => {

        if (params['id']) {
          this.traerObjeto(params['id']);
        } else {
          console.log('Nuevo');
        }
      });
  }

   // ===========================================================================
  // VALIDAR PERMISO
  // ===========================================================================
  validarPermiso(perfil){
    this.seguridadService.validarRuta(perfil, 'USUA').subscribe((data: any) => {
        if(data.length===0){     
          alert('Acceso no permitido');     
            this.router.navigate(['dashboard'])       
        }
    });
  }


  /*******************************
   * CONSTRUCCIÓN DEL FORMULARIO *
   *******************************/
  form: FormGroup = new FormGroup({
    identificacion: new FormControl('', Validators.required),
    id_tipo_identificacion: new FormControl('', Validators.required),
    nombre1: new FormControl('', Validators.required),
    nombre2: new FormControl('', Validators.required),
    apellido1: new FormControl('', Validators.required),
    apellido2: new FormControl('', Validators.required),
    id_perfil: new FormControl('', Validators.required),
    login: new FormControl('', Validators.required),
    clave: new FormControl(''),
    claveCF: new FormControl(''),
    correo: new FormControl('', Validators.required),
  });

  /****************************************************
   * INICIALIZAR EL FORUMARIO CON VALORES POR DEFECTO *
   ****************************************************/
  initializeFormGroup() {
    this.form.setValue({
      identificacion: '',
      id_tipo_identificacion: '',
      nombre1: '',
      nombre2: '',
      apellido1: '',
      apellido2: '',
      id_perfil: '',
      login: '',
      clave: '',
      correo: '',
      claveCF: '',
    });
  }

  /**************************************************************************
   * FUNCIÓN PARA ACCEDER A LOS CONTROLES DEL FORMULARIO REACTIVO PRINCIPAL *
   **************************************************************************/
  get f() { return this.form.controls; }

  /**********************************************************
   * FUNCION QUE AGRUPA LOS LLAMADOS A LAS LISTAS DE COMBOS *
   **********************************************************/
  cargarEntidades() {

    this.dataService.catalogoEntidadBasica('TipoIdentificacion', [], [])
      .subscribe((data: any) => { this.tipos_identificacion = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
    this.dataService.catalogoEntidadBasica('Rol', [], [])
      .subscribe((data: any) => { this.perfiles = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });

  }


  /******************************
   * GUARDAR EL OBJETO PRINCIPAL *
   ******************************/
  guardar() {

    /* Controla la validación del formulario, si es invalido, muestra los mensaje y no permite guardar */
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }


    const md5 = new Md5();


    /* Arma el objeto según la entidad del backend, incluye el campo de validación */

    let obj = null;

    if (this.form.value.clave !== '') {

    obj = {
      campoValidacion: 'usuario',
      valor: this.form.value.login,
      entidad: {
        id: this.pk,
        identificacion: this.form.value.identificacion,
        nombre1: this.form.value.nombre1.toUpperCase(),
        nombre2: this.form.value.nombre2.toUpperCase(),
        apellido1: this.form.value.apellido1.toUpperCase(),
        apellido2: this.form.value.apellido2.toUpperCase(),
        login: this.form.value.login.toUpperCase(),
        clave: md5.appendStr(this.form.value.clave).end(),
        correo: this.form.value.correo.toUpperCase(),
        tipo_identificacion: this.form.value.id_tipo_identificacion,
        id_perfil: this.form.value.id_perfil,
      }
    };
  } else {
    obj = {
      campoValidacion: 'usuario',
      valor: this.form.value.login,
      entidad: {
        id: this.pk,
        identificacion: this.form.value.identificacion,
        nombre1: this.form.value.nombre1.toUpperCase(),
        nombre2: this.form.value.nombre2.toUpperCase(),
        apellido1: this.form.value.apellido1.toUpperCase(),
        apellido2: this.form.value.apellido2.toUpperCase(),
        login: this.form.value.login,
        clave: this.claveaux,
        correo: this.form.value.correo.toUpperCase(),
        tipo_identificacion: this.form.value.id_tipo_identificacion,
        id_perfil: this.form.value.id_perfil,
      }
    };
  }



  const val = {
    campoValidacion : 'usuario',
        valor: this.form.value.login,
        entidad: {
        id: 0
        }
  };

    if (this.loginaux === this.form.value.login) {
      this.seguridadService.guardarUsuario(obj.entidad).subscribe((data1: any) => {
        this.notifier.notify('success', 'La información se ha actualizado correctamente');
        /* Luego de guardar redirige a modo de edición */
        setTimeout(() => {
          this.utilService.editar('/seguridad/usuarios', data1.id);
        }, 1000);
      });
    } else {

      this.dataService.validar(val, 'Usuario').subscribe((data: any) => {
        if (data !== null) {
          this.notifier.notify('error', 'El login ingresado ya existe, por favor corrija y guarde nuevamente');
        } else {

          this.seguridadService.guardarUsuario(obj.entidad).subscribe((data1: any) => {
            this.notifier.notify('success', 'La información se ha actualizado correctamente');
            /* Luego de guardar redirige a modo de edición */
            setTimeout(() => {
              this.utilService.editar('/seguridad/usuarios', data1.id);
            }, 1000);
          }, error => {
            /* Genera este mensaje cuando hya un error de codigo repetido en el backend */
            this.notifier.notify('error', 'El login ingresado ya existe, por favor corrija y guarde nuevamente');
          });
        }
      });
    }

  }




  // ===========================================================================
  // CONFIRMA LAS CLAVES y se posisiona FOCO
  // ===========================================================================
  confirmarClave(event) {
    if (this.form.value.clave !== this.form.value.claveCF) {
      this.notifier.notify('error', 'Las claves no coinciden');
      this.form.controls['clave'].setValue('');
      this.form.controls['claveCF'].setValue('');
      this.myInput.nativeElement.focus();
    }
  }


  /*********************************
   * DEVUELVE LA LISTADO PRINCIPAL *
   *********************************/
  cancelar() {
    this.utilService.cancelar('/seguridad/usuarios')
  }

  /********************************************************************************
   * TRAE EL OBJETO PRINCIPAL Y LO ASIGNA A LOS CONTROLES DEL FORMULARIO REACTIVO *
   ********************************************************************************/
  traerObjeto(id) {
    this.dataService.traerObjetoId('Usuario', id).subscribe((data: any) => {
      this.pk = id;
      this.form.controls['identificacion'].setValue(data.idPersona.identificacion);
      this.form.controls['id_tipo_identificacion'].setValue(data.idPersona.tipoIdentificacion.id);
      this.form.controls['nombre1'].setValue(data.idPersona.primerNombre);
      this.form.controls['nombre2'].setValue(data.idPersona.segundoNombre);
      this.form.controls['apellido1'].setValue(data.idPersona.primerApellido);
      this.form.controls['apellido2'].setValue(data.idPersona.segundoApellido);
      this.form.controls['id_perfil'].setValue(data.idRol.id);
      this.form.controls['login'].setValue(data.usuario);
      this.form.controls['correo'].setValue(data.idPersona.correoElectronico);
      this.loginaux = data.usuario;
      this.claveaux = data.clave;
    });
  }



  /*****************************************************************
   * ACTUALIZA TODO EL COMPONENTE E INICIALIZA FORMULARIO Y LISTAS *
   *****************************************************************/
  clearForm() {
    this.utilService.cancelar('/seguridad/usuario');
  }
}
