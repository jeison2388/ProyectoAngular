import { Component, OnInit } from '@angular/core';
import { NgbTimepickerConfig, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { DataService } from '../../../../servicios/data.service';
import { UtilService } from '../../../../servicios/util.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { SeguridadService } from '../../../../servicios/seguridad.service';

@Component({
  selector: 'app-permiso',
  templateUrl: './permiso.component.html',
  providers: [NgbTimepickerConfig]
})
export class PermisoComponent implements OnInit {

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
  recursos: any[];


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
    public seguridadService: SeguridadService,
    public router: Router,
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
    this.seguridadService.validarRuta(perfil, 'PERM').subscribe((data: any) => {
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
    perfil: new FormControl('', Validators.required),
    recurso: new FormControl('', Validators.required),   
  });

  /****************************************************
   * INICIALIZAR EL FORUMARIO CON VALORES POR DEFECTO *
   ****************************************************/
  initializeFormGroup() {
    this.form.setValue({
      perfil: '',
      recurso: '',      
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
    this.dataService.catalogoEntidadBasica('Rol', [], [])
      .subscribe((data: any) => { this.perfiles = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
    this.dataService.catalogoEntidadBasica('Recurso', [], [])
        .subscribe((data: any) => { this.recursos = data; },
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


    /* Arma el objeto según la entidad del backend, incluye el campo de validación */
    let obj = {

      id: this.pk,
      idRol: { id: this.form.value.perfil },
      idRecurso: { id: this.form.value.recurso },

    }

    let permisos: any[];
    let existe = false;
    this.dataService.catalogoEntidadBasica('Permiso', ['idRec', 'idPer'], [this.form.value.recurso, this.form.value.perfil])
      .subscribe((data: any) => {

        permisos = data;


        if (permisos.length > 0) {
          existe = true;
        }


      },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });

    setTimeout(() => {

      if (existe) {
        this.notifier.notify('error', 'El permiso para el perfil seleccionado ya existe');
      } else {
        /* Controla guardado de edición o inserción, segun el valor del Id (pk) formulario principal*/
        if (this.pk > 0) {
          console.log('edition mode')
          this.dataService.guardar(obj, 'Permiso').subscribe((data: any) => {
            this.notifier.notify('success', 'La información se ha actualizado correctamente');
            /* Luego de guardar redirige a modo de edición */
            setTimeout(() => {
              this.utilService.editar('/seguridad/permisos', data.id);
            }, 1000);
          });
        } else {
          this.dataService.guardar(obj, 'Permiso').subscribe((data: any) => {
            this.notifier.notify('success', 'La información se ha almacenado correctamente');
            /* Luego de guardar redirige a modo de edición */
            setTimeout(() => {
              this.utilService.editar('/seguridad/permisos', data.id);
            }, 1000);

          }, error => {
            /* Genera este mensaje cuando hya un error de codigo repetido en el backend */
            this.notifier.notify('error', 'El código ingresado ya existe, por favor corrija y guarde nuevamente');
          });
        }
      }
    }, 1000);


  }

  /*********************************
   * DEVUELVE LA LISTADO PRINCIPAL *
   *********************************/
  cancelar() {
    this.utilService.cancelar('/seguridad/permisos')
  }

  /********************************************************************************
   * TRAE EL OBJETO PRINCIPAL Y LO ASIGNA A LOS CONTROLES DEL FORMULARIO REACTIVO *
   ********************************************************************************/
  traerObjeto(id) {
    this.dataService.traerObjetoId('Permiso', id).subscribe((data: any) => {
      this.pk = id;
      this.form.controls['perfil'].setValue(data.idRol.id);
      this.form.controls['recurso'].setValue(data.idRecurso.id);
    });
  }



  /*****************************************************************
   * ACTUALIZA TODO EL COMPONENTE E INICIALIZA FORMULARIO Y LISTAS *
   *****************************************************************/
  clearForm() {
    this.utilService.cancelar('/seguridad/permiso');
  }


}