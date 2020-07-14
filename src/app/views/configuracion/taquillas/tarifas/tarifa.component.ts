import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../../../servicios/data.service';
import { IOption } from 'ng-select';
import { TarifasService } from '../../../../servicios/tarifas.service';
import { UtilService } from '../../../../servicios/util.service';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';


function ssnValidator(control: FormControl): {[key: string]: any} {
  const value: string = control.value || '';
  const valid = value.match(/^\d{9}$/);
  return valid ? null : {ssn: true};
}


@Component({
  selector: 'app-tarifa',
  templateUrl: './tarifa.component.html',
})
export class TarifaComponent implements OnInit {

  public readonly notifier: NotifierService;

  constructor(
    public dataService: DataService,
    public tarifasService: TarifasService,
    public utilService: UtilService,
    public router: Router,
    private route: ActivatedRoute,
    public notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
   }

   /**************************************************************************
   * FUNCIÓN PARA ACCEDER A LOS CONTROLES DEL FORMULARIO REACTIVO PRINCIPAL *
   **************************************************************************/
  get f() { return this.form.controls; }
  /********************************************************************
   * DECLARACIÓN VARIABLES DE TIPO TIME PARA EL SELECTOR DE HORARIOS *
   ********************************************************************/
  timeIniU: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  timeFinU: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };

  /*******************************
   * CONSTRUCCIÓN DEL FORMULARIO *
   *******************************/
  form: FormGroup = new FormGroup({
    codigo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    fechaLimite: new FormControl('', Validators.required),
    vigenciaDesde: new FormControl('', Validators.required),
    vigenciaHasta: new FormControl('', Validators.required),
    inicio: new FormControl('', Validators.required),
    fin: new FormControl('', Validators.required),
    aplicaCeroCategorias: new FormControl(false),
    permiteVentasFuturo: new FormControl(false),
    numeroDiasPago: new FormControl('', [Validators.pattern('[0-9]*$'), Validators.required]),
    pagoUnico: new FormControl(false),
    grupo: new FormControl({value: '', disabled: true}),
    apertura: new FormControl('', Validators.required),
    ccosto: new FormControl({value: '', disabled: true}),
    vcosto: new FormControl({value: '', disabled: true}),
    punto_venta: new FormControl({value: '', disabled: true}),
    tipoAplicacion: new FormControl('', Validators.required),
    empresa: new FormControl('', Validators.required),
    codServicio: new FormControl({value: '', disabled: true}),
    desServicio: new FormControl({value: '', disabled: true}),
    temporada: new FormControl(''),
    horario_desde: new FormControl(this.timeIniU),
    horario_hasta: new FormControl(this.timeFinU),
  });


  aperCod: any[];
  aperDes: any[];
  servicios_agregados: any[] = [];
  puntos: any[] = [];
  tipoAplicaciones: any[];
  empresas: any[];
  dias: any[];
  temporadas: any[];
  categorias: any[];
  tipos_usuario: any[];
  tarifas: any = [];
  plantilla_tarifas: any = [];
  objeto_dias: any = [];
  objeto_tarifa_categoria_tipou: any = [];
  unidades: any[] = [];
  objeto_dias_edicion: any = [];

  codAper = '';
  desAper = '';
  aper = 0;
  pk = null;
  hDesde: any;
  hHasta: any;

  

  /****************************************************
   * INICIALIZAR EL FORUMARIO CON VALORES POR DEFECTO *
   ****************************************************/
  initializeFormGroup() {
    this.form.setValue({
      codigo: '',
      descripcion: '',
      fechaLimite: '',
      vigenciaDesde: '',
      vigenciaHasta: '',
      inicio: '',
      fin: '',
      aplicaCeroCategorias: '',
      permiteVentasFuturo: '',
      numeroDiasPago: '',
      pagoUnico: '',
      grupo: '',
      apertura: '',
      ccosto: '',
      vcosto: '',
      punto_venta: '',
      tipoAplicacion: '',
      empresa: '',
      codServicio: '',
      desServicio: '',
      temporada: '',
      horario_desde: '',
      horario_hasta: ''
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

    this.buscarAperturas('');
    this.buscarAperturasCodigo('');
    this.cargarEntidades();
    // this.cargarTarifasCategoriaUsuario(0);
  }

  /**********************************************************
   * FUNCION QUE AGRUPA LOS LLAMADOS A LAS LISTAS DE COMBOS *
   **********************************************************/
  cargarEntidades() {
    this.dataService.catalogoEntidadBasica('TipoAplicacionTarifa', [], [])
      .subscribe((data: any) => { this.tipoAplicaciones = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });

    this.dataService.catalogoEntidadBasica('Empresa', [], [])
      .subscribe((data: any) => { this.empresas = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
    this.dataService.catalogoEntidadBasica('DiaSemana', [], [])
      .subscribe((data: any) => { this.dias = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
    this.dataService.catalogoEntidadBasica('Temporada', [], [])
      .subscribe((data: any) => { this.temporadas = data; },
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
  }

  buscarAperturas(term) {
    this.dataService.catalogoEntidadBasicaComboDescripcion('Apertura', ['descripcion'], [term.term], 1, 5)
     .subscribe((data: any) => { this.aperDes = data; },
     error => {console.log('There was an error while retrieving data !!!' + error); });
  }

  buscarAperturasCodigo(term) {
    this.dataService.catalogoEntidadBasicaComboCodigo('Apertura', ['codigo'], [term.term], 1, 5)
     .subscribe((data: any) => { this.aperCod = data; },
     error => {console.log('There was an error while retrieving data !!!' + error); });
  }

  seleccionarApertura(option: IOption) {
    if (option !== undefined) {
      this.dataService.traerObjetoId('Apertura', option.value).subscribe((data: any) => {
        this.aper = data.id;
        this.form.controls['apertura'].setValue(data.codigo);
        this.form.controls['codServicio'].setValue(data.idServicio.codigo);
        this.form.controls['desServicio'].setValue(data.idServicio.descripcion);
        this.form.controls['grupo'].setValue(data.idSubgrupo.idGrupo.descripcion);
        this.form.controls['ccosto'].setValue(data.idCentroCosto.descripcion);
        this.form.controls['vcosto'].setValue(data.idServicio.costo);
        // this.codAper = data.codigo;
        this.desAper = data.descripcion;
        this.cargarPaquetes(data.idServicio.id);
        this.cargarAperturaPunto(data.id);
        this.form.get('punto_venta').patchValue(this.puntos);
      });
    }
  }

  seleccionarAperturaId(id) {
      this.dataService.traerObjetoId('Apertura', id).subscribe((data: any) => {
        this.aper = data.id;
        this.form.controls['apertura'].setValue(data.codigo);
        this.form.controls['codServicio'].setValue(data.idServicio.codigo);
        this.form.controls['desServicio'].setValue(data.idServicio.descripcion);
        this.form.controls['grupo'].setValue(data.idSubgrupo.idGrupo.descripcion);
        this.form.controls['ccosto'].setValue(data.idCentroCosto.descripcion);
        this.form.controls['vcosto'].setValue(data.idServicio.costo);
        // this.codAper = data.codigo;
        this.desAper = data.descripcion;
        this.cargarPaquetes(data.idServicio.id);
        this.cargarAperturaPunto(data.id);
        this.form.get('punto_venta').patchValue(this.puntos);
      });
  }

  /**********************************************************
   * CARGA EL LISTADO DE SERVICIOS PERTENECIENTES AL PAQUETE *
   **********************************************************/
  cargarPaquetes(id) {
    this.dataService.catalogoEntidadBasica('PaqueteServicio', ['serv'], [id])
      .subscribe((data: any) => { this.servicios_agregados = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
  }

  cargarAperturaPunto(apertura) {
    this.dataService.listaEntidadRelacion('AperturaPunto', ['idApertura'], ['id'], [apertura])
      .subscribe((data: any) => {
        let i = 0;
        data.forEach(element => {
           this.puntos.push({value: element.idPunto.id, label: element.idPunto.descripcion});
          i++;
        });
      },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
  }


  filterByProperty(array, prop, value) {
    const filtered = [];
    for (let i = 0; i < array.length; i++) {
        const obj = array[i];
        for (const key in obj) {
            if (typeof(obj[key] === 'object')) {
                const item = obj[key];
                if (item[prop] === value) {
                    filtered.push(item);
                }
            }
        }
    }
    return filtered;
}

  buscarTarifa(array, valor1, valor2, valor3) {
    const tarifas = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i].id_categoria == valor1 && array[i].id_tipo_usuario == valor2 && array[i].empresa == valor3 ) {
              tarifas.push(this.tarifas[i]);
            }
        }
    return tarifas;
  }


  cargarTarifasCategoriaUsuario(empresa) {
    this.dataService.catalogoEntidadBasica('VistaTarifasCu', ['idEmpresa', 'idTarifa'], [empresa, this.pk])
      .subscribe((data: any) => {
        data.forEach(element => {
          this.tarifas.push(
            { id: element.id,
              id_tarifa: element.idTarifa,
              id_categoria: element.idCategoria,
              id_tipo_usuario: element.idTipoUsuario,
              valor: element.valor,
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

  armarPlantilla(event) {
    this.cargarTarifasCategoriaUsuario(event.target.value);
    this.categorias.forEach(cat => {
      this.tipos_usuario.forEach(tip => {
        const res = this.buscarTarifa(this.tarifas, cat.id, tip.id, this.form.value.empresa);
        if (res[0] !== undefined) {
          (<HTMLInputElement>document.getElementById(cat.id + '-' + tip.id)).value = res[0].valor;
          (<HTMLInputElement>document.getElementById(cat.id + '-' + tip.id)).disabled = true;
        } else {
          (<HTMLInputElement>document.getElementById(cat.id + '-' + tip.id)).value = '0';
          (<HTMLInputElement>document.getElementById(cat.id + '-' + tip.id)).disabled = true;
        }
      });
    });
  }

  desactivar(event, cat, tip) {
      if (event.target.checked) {
      (<HTMLInputElement>document.getElementById(cat + '-' + tip)).disabled = true;
    } else {
      (<HTMLInputElement>document.getElementById(cat + '-' + tip)).disabled = false;
    }
  }


  guardar() {

    if (this.form.value.tipoAplicacion == 1) {
      this.extraerDias();
    }
      this.extraerValoresTarifas();

    const obj = {
      id: this.pk,
      codigo: this.form.value.codigo,
      descripcion: this.form.value.descripcion,
      vigenciaDesde: this.form.value.vigenciaDesde,
      vigenciaHasta: this.form.value.vigenciaHasta,
      inicio: this.form.value.inicio,
      fin: this.form.value.fin,
      fechaLimite: this.form.value.fechaLimite,
      aplicaCeroCategorias: this.form.value.aplicaCeroCategorias,
      permiteVentasFuturo: this.form.value.permiteVentasFuturo,
      numeroDiasPago: this.form.value.numeroDiasPago,
      pagoUnico: this.form.value.pagoUnico,
      apertura: this.aper,
      tipoAplicacion: this.form.value.tipoAplicacion,
      temporada: this.form.value.temporada,
      dias: this.objeto_dias,
      tarifas: this.objeto_tarifa_categoria_tipou,
      horarioDesde: moment(this.form.value.horario_desde.hour + ':' +
                           this.form.value.horario_desde.minute + ':' +
                           this.form.value.horario_desde.second, 'HH:mm:ss').format('HH:mm:ss'),
      horarioHasta: moment(this.form.value.horario_hasta.hour + ':' +
                           this.form.value.horario_hasta.minute + ':' +
                           this.form.value.horario_hasta.second, 'HH:mm:ss').format('HH:mm:ss'),
    };
    this.tarifasService.guardarTarifa(obj).subscribe((data: any) => {
      this.notifier.notify('success', data.mensaje);
    });

  }

  /*********************************
   * DEVUELVE LA LISTADO PRINCIPAL *
   *********************************/
  cancelar() {
    this.utilService.cancelar('/taquillas/tarifas');
  }

  /*********************************
   * DEVUELVE LOS DIAS MARCADOS *
   *********************************/
  extraerDias() {
    this.dias.forEach(dia => {
      if ((<HTMLInputElement>document.getElementById('dia_' + dia.id)).checked ) {
        this.objeto_dias.push(dia.id);
      }
    });
  }


  /*********************************
   * DEVUELVE LOS VALORES EMPRESA *
   *********************************/
  extraerValoresTarifas() {
    this.categorias.forEach(cat => {
      this.tipos_usuario.forEach(tip => {
        this.objeto_tarifa_categoria_tipou.push(
          {
            categoria: cat.id,
            tipoUsuario: tip.id,
            valor: (<HTMLInputElement>document.getElementById(cat.id + '-' + tip.id)).value,
            idEmpresa: this.form.value.empresa
          },
        );

      });
    });
  }

  /********************************************************************************
   * TRAE EL OBJETO PRINCIPAL Y LO ASIGNA A LOS CONTROLES DEL FORMULARIO REACTIVO *
   ********************************************************************************/
  traerObjeto(id) {
    this.dataService.traerObjetoId('Tarifa', id).subscribe((data: any) => {
      this.pk = id;
      this.form.controls['codigo'].setValue(data.codigo);
      this.form.controls['descripcion'].setValue(data.descripcion);
      this.form.controls['fechaLimite'].setValue(data.fechaLimiteInscripcion);
      this.form.controls['vigenciaDesde'].setValue(data.fechaVigenciaDesde);
      this.form.controls['vigenciaHasta'].setValue(data.fechaVigenciaHasta);
      this.form.controls['inicio'].setValue(data.fechaInicial);
      this.form.controls['fin'].setValue(data.fechaFinal);
      this.form.controls['aplicaCeroCategorias'].setValue(data.aplicaCeroCategorias);
      this.form.controls['permiteVentasFuturo'].setValue(data.permiteVentasFuturo);
      this.form.controls['numeroDiasPago'].setValue(data.numeroDiasPago);
      this.form.controls['pagoUnico'].setValue(data.pagoUnico);
      this.form.controls['apertura'].setValue(data.idApertura.id);
      this.form.controls['temporada'].setValue(data.temporada);
      this.form.controls['tipoAplicacion'].setValue(data.idTipoAplicacion.id);
      const ini = this.utilService.separarCadena(data.horarioDesde, ':');
      const fin = this.utilService.separarCadena(data.horarioHasta, ':');
      this.timeIniU.hour = Number(ini[0]);
      this.timeIniU.minute = Number(ini[1]);
      this.timeFinU.hour = Number(fin[0]);
      this.timeFinU.minute = Number(fin[1]);
      this.hDesde = this.timeIniU;
      this.hHasta = this.timeFinU;
      this.seleccionarAperturaId(data.idApertura.id);
      this.cargarUnidadesApertura(data.idApertura.id);
      setTimeout(() => {
        this.form.get('punto_venta').patchValue(this.unidades);
      }, 1000);
      this.cargarDiasTarifa(id);
    });
  }

  cargarUnidadesApertura(apertura) {
    this.dataService.listaEntidadRelacion('AperturaPunto', ['idApertura'], ['id'], [apertura])
      .subscribe((data: any) => {
        let i = 0;
        data.forEach(element => {
           this.unidades.push({value: element.idPunto.id, label: element.idPunto.descripcion});
          i++;
        });
      },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
  }

  cargarDiasTarifa(tarifa) {
    this.dataService.listaEntidadRelacion('TarifaDia', ['idTarifa'], ['id'], [tarifa])
      .subscribe((data: any) => {
        this.dias.forEach(dia => {
          data.forEach(dia_edit => {
            if (dia.id === dia_edit.idDia.id) {
              console.log('Dia marcado:' + dia_edit.idDia.descripcion);
              (<HTMLInputElement>document.getElementById('dia_' + dia.id)).checked = true;
            }
          });
        });
      },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
  }



}
