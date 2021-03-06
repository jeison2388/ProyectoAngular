import { Component, OnInit } from '@angular/core';
import { NgbTimepickerConfig, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { DataService } from '../../../../servicios/data.service';
import { UtilService } from '../../../../servicios/util.service';
import { SeguridadService } from '../../../../servicios/seguridad.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  providers: [NgbTimepickerConfig]
})
export class PerfilComponent implements OnInit {

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
  codaux = '';


  /*******************************************
   * VARIABLES PARA EL FORMULARIO SECUNDARIO *
   *******************************************/
  codigoS = '';
  descripcionS = '';
 

  //Variables para controlar caso especial de mensajes de validación en el formulario secundario 
  invalidCod = "";
  invalidDes = "";

  /********************************************
   * DECLARA VARIABLE PARA LAS NOTIFICACIONES *
   ********************************************/
  public readonly notifier: NotifierService;

  constructor(config: NgbTimepickerConfig,
    public dataService: DataService,
    public utilService: UtilService,
    public notifierService: NotifierService,
    public router: Router,
    public seguridadService: SeguridadService,
    private route: ActivatedRoute, ) {

    
    //incicializa variable de las notificaciones
    this.notifier = notifierService;
    // this.validarPermiso(localStorage.getItem('id_perfil'));
  }

  ngOnInit() {  
    //Inicializa el formulario reactivo principal
    this.initializeFormGroup();
    //Carga las listas de mostrar al inicio, combos especialmente
    this.cargarEntidades();

    /**********************************************************************
     * RECOGE LOS PARAMETROS DE LA URL Y TRAE LE OBJETO PARA MODO EDICIÓN *
     **********************************************************************/
    this.route
      .queryParams
      .subscribe(params => {
        console.log(params)
        if (params['id']) {
          this.traerObjeto(params['id'])
        } else {
          console.log('Nuevo')
        }
      })
  }

  // ===========================================================================
  // VALIDAR PERMISO
  // ===========================================================================
  validarPermiso(perfil){
    this.seguridadService.validarRuta(perfil, 'PERF').subscribe((data: any) => {
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
    codigo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),   
  });

  /****************************************************
   * INICIALIZAR EL FORUMARIO CON VALORES POR DEFECTO *
   ****************************************************/
  initializeFormGroup() {
    this.form.setValue({
      codigo: '',
      descripcion: '',
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


    /* Arma el objeto según la entidad del backend, incluye el campo de validación */
    const obj = {
      campoValidacion: 'codigo',
      valor: this.form.value.codigo.toUpperCase(),
      entidad: {
        id: this.pk,
        codigo: this.form.value.codigo.toUpperCase(),
        descripcion: this.form.value.descripcion.toUpperCase(),
      }
    };

    /* Controla guardado de edición o inserción, segun el valor del Id (pk) formulario principal*/
    if (this.pk > 0) {
      console.log('edition mode')


      if (this.codaux === this.form.value.codigo) {
        this.dataService.guardar(obj.entidad, 'Rol').subscribe((data: any) => {
          this.notifier.notify('success', 'La información se ha actualizado correctamente');
          /* Luego de guardar redirige a modo de edición */
          setTimeout(() => {
            this.utilService.editar('/seguridad/roles', data.id);
          }, 1000);
        });

      } else {
      this.dataService.guardarPorCampo(obj, 'Rol').subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha actualizado correctamente');
        /* Luego de guardar redirige a modo de edición */
        setTimeout(() => {
          this.utilService.editar('/seguridad/roles', data.id);
        }, 1000);
      }, error => {
        /* Genera este mensaje cuando hya un error de codigo repetido en el backend */
        this.notifier.notify('error', 'El código ingresado ya existe, por favor corrija y guarde nuevamente');
      });
    }



    } else {
      this.dataService.guardarPorCampo(obj, 'Rol').subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha almacenado correctamente');
        /* Luego de guardar redirige a modo de edición */
        setTimeout(() => {
          this.utilService.editar('/seguridad/roles', data.id);
        }, 1000);

      }, error => {
        /* Genera este mensaje cuando hya un error de codigo repetido en el backend */
        this.notifier.notify('error', 'El código ingresado ya existe, por favor corrija y guarde nuevamente');
      });
    }
  }

  /*********************************
   * DEVUELVE LA LISTADO PRINCIPAL *
   *********************************/
  cancelar() {
    this.utilService.cancelar('/seguridad/roles');
  }

  /********************************************************************************
   * TRAE EL OBJETO PRINCIPAL Y LO ASIGNA A LOS CONTROLES DEL FORMULARIO REACTIVO *
   ********************************************************************************/
  traerObjeto(id) {
    this.dataService.traerObjetoId('Rol', id).subscribe((data: any) => {
      this.pk = id;
      this.form.controls['codigo'].setValue(data.codigo);
      this.form.controls['descripcion'].setValue(data.descripcion);
      this.codaux = data.codigo;
    });
  }



  /*****************************************************************
   * ACTUALIZA TODO EL COMPONENTE E INICIALIZA FORMULARIO Y LISTAS *
   *****************************************************************/
  clearForm() {
    this.utilService.cancelar('/seguridad/rol');
  }


}