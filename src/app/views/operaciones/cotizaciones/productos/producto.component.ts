import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { UtilService } from '../../../../servicios/util.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../../../servicios/data.service';
import { OperacionesService } from '../../../../servicios/operaciones.service'
import { LoadingScreenService } from '../../../../servicios/loading-screen/loading-screen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
})
export class ProductoComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  loadingSubscription: Subscription;

  public readonly notifier: NotifierService;
  pk = null;
  pkProd = null;
  submitted = false;
  np = false;
  tiposProducto: any[];
  ivas: any[];
  productos: any[];
  empresas: any[];
  categorias: any[];
  tipos_usuario: any[];
  tarifasProd: any = [];
  objeto_producto_categoria_tipou: any = [];

  tiposEvento: any[];

  constructor(
    public notifierService: NotifierService,
    public dataService: DataService,
    public operacionesService: OperacionesService,
    public utilService: UtilService,
    public router: Router,
    private route: ActivatedRoute,
    private loadingScreenService: LoadingScreenService
    ) {
      this.notifier = notifierService;
    }

   /**************************************************************************
   * FUNCIÓN PARA ACCEDER A LOS CONTROLES DEL FORMULARIO REACTIVO PRINCIPAL *
   **************************************************************************/
  get f() { return this.form.controls; }
  get fp() { return this.formprod.controls; }
  get fni() { return this.formnota.controls; }

  /*******************************
   * CONSTRUCCIÓN DEL FORMULARIO *
   *******************************/
  form: FormGroup = new FormGroup({
    nit: new FormControl('', Validators.required),
    nombreComercia: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    telefono: new FormControl('', [Validators.pattern('[0-9]*$'), Validators.required]),
    representanteLegal: new FormControl('', Validators.required),
    mail: new FormControl('', [Validators.required, Validators.email]),
  });

  /*******************************
   * CONSTRUCCIÓN DEL FORMULARIO 2 *
   *******************************/
  formprod: FormGroup = new FormGroup({
    codigo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    tipoProducto: new FormControl('', Validators.required),
    precioUnitario: new FormControl('', Validators.required),
    fechaVigenciaDesde: new FormControl('', Validators.required),
    fechaVigenciaHasta: new FormControl('', Validators.required),
    iva: new FormControl('', Validators.required),
    tarifaBaseSub: new FormControl('', Validators.required),
    aplicaTarifaSub: new FormControl(false),
    detalle: new FormControl(''),
    empresa: new FormControl(''),
  });

  /*******************************
   * CONSTRUCCIÓN DEL FORMULARIO NOTAS *
   *******************************/
  formnota: FormGroup = new FormGroup({
    tipoEvento: new FormControl('', Validators.required),
    nota: new FormControl('', Validators.required),
  });


  initializeFormGroup() {
    this.form.setValue({
      nit: '',
      nombreComercia: '',
      direccion: '',
      telefono: '',
      representanteLegal: '',
      mail: '',
    });
  }



  initializeFormGroup1() {
    this.form.setValue({
      codigo: '',
      descripcion: '',
      tipoProducto: '',
    });
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        if (params['id']) {
          this.traerObjeto(params['id']);
        } else {
          console.log('Nuevo');
        }
      });
      this.cargarEntidades();

      this.loadingSubscription = this.loadingScreenService.loadingStatus.subscribe((value) => {
        this.loading = value;
      });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  /**********************************************************
   * FUNCION QUE AGRUPA LOS LLAMADOS A LAS LISTAS DE COMBOS *
   **********************************************************/
  cargarEntidades() {
    this.dataService.catalogoEntidadBasica('TipoProducto', [], [])
      .subscribe((data: any) => { this.tiposProducto = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });

    this.dataService.catalogoEntidadBasica('Iva', [], [])
      .subscribe((data: any) => { this.ivas = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });

    this.dataService.catalogoEntidadBasica('Empresa', [], [])
      .subscribe((data: any) => { this.empresas = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });

    this.dataService.catalogoEntidadBasica('Categoria', [], [])
      .subscribe((data: any) => { this.categorias = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });

    this.dataService.catalogoEntidadBasica('TipoUsuario', [], [])
      .subscribe((data: any) => { this.tipos_usuario = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });

    this.dataService.catalogoEntidadBasica('TipoEvento', [], [])
      .subscribe((data: any) => { this.tiposEvento = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
  }


  guardar() {
    /* Controla la validación del formulario, si es invalido, muestra los mensaje y no permite guardar */
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const obj = {
      campoValidacion: 'nit',
      valor: this.form.value.nit,
    entidad: {
      id: this.pk,
      nit: this.form.value.nit,
      nombreComercia: this.form.value.nombreComercia,
      direccion: this.form.value.direccion,
      telefono: this.form.value.telefono,
      representanteLegal: this.form.value.representanteLegal,
      mail: this.form.value.mail,
      activo: true
    }
  };
    /* Controla guardado de edición o inserción, segun el valor del Id (pk) formulario principal*/
    if (this.pk > 0) {
      this.dataService.guardar(obj.entidad, 'Proveedor').subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha actualizado correctamente');
        /* Luego de guardar redirige a modo de edición */
        setTimeout(() => {
          this.utilService.editar('/cotizaciones/producto', data.id);
        }, 1000);
      });
    } else {
      this.dataService.guardarPorCampo(obj, 'Proveedor').subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha almacenado correctamente');

        /* Luego de guardar redirige a modo de edición */
        setTimeout(() => {
          this.utilService.editar('/cotizaciones/producto', data.id);
        }, 1000);

      }, error => {
        /* Genera este mensaje cuando hya un error de codigo repetido en el backend */
        this.notifier.notify('error', 'El código ingresado ya existe, por favor corrija y guarde nuevamente');
      });
    }
  }

  /********************************************************************************
   * TRAE EL OBJETO PRINCIPAL Y LO ASIGNA A LOS CONTROLES DEL FORMULARIO REACTIVO *
   ********************************************************************************/
  traerObjeto(id) {
    this.dataService.traerObjetoId('Proveedor', id).subscribe((data: any) => {
      this.pk = id;
      this.form.controls['nit'].setValue(data.nit);
      this.form.controls['nombreComercia'].setValue(data.nombreComercia);
      this.form.controls['direccion'].setValue(data.direccion);
      this.form.controls['representanteLegal'].setValue(data.representanteLegal);
      this.form.controls['telefono'].setValue(data.telefono);
      this.form.controls['mail'].setValue(data.mail);
      this.traerProductos(id);
    });
  }

  /*********************************
   * DEVUELVE LA LISTADO PRINCIPAL *
   *********************************/
  cancelar() {
    this.utilService.cancelar('/cotizaciones/productos')
  }


  nuevoProducto() {
    this.np = true;
  }



  guardarProducto() {

    this.loadingScreenService.startLoading();
    /* Controla la validación del formulario, si es invalido, muestra los mensaje y no permite guardar */
    if (this.formprod.invalid) {
      return;
    }

    if (this.formprod.value.tarifaBaseSub && this.formprod.value.empresa !== '') {
      this.extraerValoresTarifas();
    }



    const obj = {
      campoValidacion: 'codigo',
      valor: this.formprod.value.codigo,
      entidad: {
        id: this.pkProd,
        codigo: this.formprod.value.codigo,
        descripcion: this.formprod.value.descripcion,
        fechaVigenciaDesde: this.formprod.value.fechaVigenciaDesde,
        fechaVigenciaHasta: this.formprod.value.fechaVigenciaHasta,
        tarifaBaseSub: this.formprod.value.tarifaBaseSub,
        precioUnitario: this.formprod.value.precioUnitario,
        activo: true,
        tipoProducto: this.formprod.value.tipoProducto,
        iva: this.formprod.value.iva,
        proveedor: this.pk,
        aplicaTarifaSub: this.formprod.value.aplicaTarifaSub,
        detalle: this.formprod.value.detalle,
        tarifas: this.objeto_producto_categoria_tipou
      }
    };
    /* Controla guardado de edición o inserción, segun el valor del Id (pk) formulario principal*/
    this.operacionesService.guardarProducto(obj.entidad).subscribe((data: any) => {
      this.notifier.notify('success', data.mensaje);
      setTimeout(() => {
        this.utilService.editar('/cotizaciones/producto', this.pk);
      }, 1000);
    });


    /*
    if (this.pk > 0) {
      this.dataService.guardar(obj.entidad, 'Producto').subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha actualizado correctamente'); 
        setTimeout(() => {
          this.utilService.editar('/cotizaciones/producto', this.pk);
        }, 1000);
      });
    } else {
      this.dataService.guardarPorCampo(obj, 'Producto').subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha almacenado correctamente');
        setTimeout(() => {
          this.utilService.editar('/cotizaciones/producto', this.pk);
        }, 1000);
      }, error => {
        this.notifier.notify('error', 'El código ingresado ya existe, por favor corrija y guarde nuevamente');
      });
    }
    */
  }


  traerProductos(proveedor) {
    this.dataService.listaEntidadRelacionOrden('Producto', ['proveedor'], ['id'], [proveedor])
      .subscribe((data: any) => {
        this.productos = data;
      },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
  }

  buscarTarifa(array, valor1, valor2, valor3) {
    const tarifas = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i].id_categoria == valor1 && array[i].id_tipo_usuario == valor2 && array[i].empresa == valor3 ) {
              tarifas.push(this.tarifasProd[i]);
            }
        }
    return tarifas;
  }

  armarPlantilla(event) {
    this.cargarTarifasCategoriaUsuario(event.target.value);
    this.categorias.forEach(cat => {
      this.tipos_usuario.forEach(tip => {
        const res = this.buscarTarifa(this.tarifasProd, cat.id, tip.id, this.formprod.value.empresa);
        if (res[0] !== undefined) {
          (<HTMLInputElement>document.getElementById(cat.id + '-' + tip.id + '-x')).value = res[0].valor;
          (<HTMLInputElement>document.getElementById(cat.id + '-' + tip.id)).value = res[0].porcentaje;
        } else {
          (<HTMLInputElement>document.getElementById(cat.id + '-' + tip.id + '-x')).value = '0';
        }
      });
    });
  }

  cargarTarifasCategoriaUsuario(empresa) {

    let prod = this.pkProd;

    if (prod == null) {
      prod = '-1';
    }

    this.dataService.catalogoEntidadBasica('VistaTarifasProd', ['idEmpresa', 'idProducto'], [empresa, prod])
      .subscribe((data: any) => {
        data.forEach(element => {
          this.tarifasProd.push(
            { id: element.id,
              id_producto: element.idProducto,
              id_categoria: element.idCategoria,
              id_tipo_usuario: element.idTipoUsuario,
              valor: element.valor,
              porcentaje: element.porcentaje,
              tipo_usuario: element.tipoUsuario,
              categoria: element.categoria,
              empresa: element.idEmpresa
            }
          );
        });
      },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
  }


  calcularTarifaSubsidiada(event) {
    const id = event.target.id.substring(0, event.target.id.length - 2);
    const porc =
    (<HTMLInputElement>document.getElementById(id)).value.substring(0, (<HTMLInputElement>document.getElementById(id)).value.length - 1);
    (<HTMLInputElement>document.getElementById(event.target.id)).value = String((this.formprod.value.tarifaBaseSub * Number(porc)) / 100);
  }

  calcularTarifaSubsidiada1(event) {
    const id = event.target.id.substring(0, event.target.id.length);
    const porc =
    (<HTMLInputElement>document.getElementById(id)).value.substring(0, (<HTMLInputElement>document.getElementById(id)).value.length - 1);
    (<HTMLInputElement>document.getElementById(event.target.id + '-x')).value
    = String((this.formprod.value.tarifaBaseSub * Number(porc)) / 100);
  }

  /*********************************
   * DEVUELVE LOS VALORES EMPRESA *
   *********************************/
  extraerValoresTarifas() {
    this.categorias.forEach(cat => {
      this.tipos_usuario.forEach(tip => {
        this.objeto_producto_categoria_tipou.push(
          {
            categoria: cat.id,
            tipoUsuario: tip.id,
            porcentaje: (<HTMLInputElement>document.getElementById(cat.id + '-' + tip.id)).value,
            valor: (<HTMLInputElement>document.getElementById(cat.id + '-' + tip.id + '-x')).value,
            idEmpresa: this.formprod.value.empresa
          },
        );
      });
    });
  }

  /*********************************
   * PREPARA EDICIÓN DEL PRODUCTO *
   *********************************/
  editarProd(idProd) {
    this.np = true;
    this.traerObjetoProd(idProd);
  }

  /********************************************************************************
   * TRAE EL OBJETO PRODUCTO Y LO ASIGNA A LOS CONTROLES PARA EDICIÓN  *
   ********************************************************************************/
  traerObjetoProd(id) {
    this.dataService.traerObjetoId('Producto', id).subscribe((data: any) => {
      this.pkProd = id;
      this.formprod.controls['codigo'].setValue(data.codigo);
      this.formprod.controls['descripcion'].setValue(data.descripcion);
      this.formprod.controls['tipoProducto'].setValue(data.tipoProducto.id);
      this.formprod.controls['precioUnitario'].setValue(data.precioUnitario);
      this.formprod.controls['fechaVigenciaDesde'].setValue(data.fechaVigenciaDesde);
      this.formprod.controls['fechaVigenciaHasta'].setValue(data.fechaVigenciaHasta);
      this.formprod.controls['iva'].setValue(data.iva.id);
      this.formprod.controls['tarifaBaseSub'].setValue(data.tarifaBaseSub);
      this.formprod.controls['aplicaTarifaSub'].setValue(data.aplicaTarifaSub);
      this.formprod.controls['detalle'].setValue(data.detalle);
    });
  }


  cancelarProd() {
    this.np = false;
    this.formprod.reset();
  }

  eliminarProd(id) {
    if (confirm('Seguro de eliminar el registro?')) {
      this.dataService.inactivarObjeto('Producto', id).subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha eliminado correctamente');
        setTimeout(() => {
          this.traerProductos(this.pk);
        }, 1000);
      }, (error: Response) => {
        if (error.status === 200) {
          this.notifier.notify('success', 'La información se ha eliminado correctamente');
        } else {
          this.notifier.notify('error', 'No es posible eliminar el registro');
          console.log(error);
        }
      });
    }
  }

}
