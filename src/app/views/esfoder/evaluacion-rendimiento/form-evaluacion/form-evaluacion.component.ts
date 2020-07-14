import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../../servicios/data.service';
import { NotifierService } from 'angular-notifier';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilEvaluacion } from '../UtilEvaluacion';
import { SubComponente } from '../../models/SubComponente';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { enableRipple } from '@syncfusion/ej2-base';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Componente } from '../../models/Componente';
import { FormsModule } from '@angular/forms';
import { EscalaValorativa } from '../../models/EscalaValorativa';
import { EvaluacionService } from '../evaluaciones.service';
import { UtilService } from '../../../../servicios/util.service';
enableRipple(true);

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface Node {
  [x: string]: any;
  name: string;
  idPrincipal: number;
  id?: number;
  selected?: boolean;
  expanded: true;
  indeterminate?: boolean;
  children?: Node[];
}

@Component({
  selector: 'app-form-evaluacion',
  templateUrl: './form-evaluacion.component.html',
})
export class FormEvaluacionComponent implements OnInit {
  // Catálogos iniciales
  programas: any;
  niveles: any;
  submitted = false;

  TREE_DATA: Node[];

  listaComponentes: Componente[] = [];
  listaComponentesGeneral: Componente[] = [];
  componentes: any[] = [];
  listaSubComponentes: SubComponente[] = [];
  subComponentes: any[] = [];
  listaEscalaValorativa: any[] = [];
  escalas: any[] = [];

  // Variables para majejar Inputs  Porcentaje
  public disabled: boolean = false;
  public rangeValidation: boolean = true;
  public format: string = 'n2';
  public formatEvaluacion: string = 'n0';
  public decimals: number = 2;
  public decimalsEvaluacion: number = 0;
  public autoCorrect: boolean = true;
  public min: number = 0;
  public max: number = 100;
  // Fin varibales inputs porcentaje

  public desde: boolean = true;
  public hasta: boolean = false;
  /********************************************
   * DECLARA VARIABLE PARA LAS NOTIFICACIONES *
   ********************************************/
  public readonly notifier: NotifierService;
  constructor(
    private el: ElementRef,
    private formBuilder: FormBuilder,
    public dataService: DataService,
    public utilService: UtilService,
    public notifierService: NotifierService,
    public router: Router,
    private route: ActivatedRoute,
    public _location: Location,
    private evaluacionService: EvaluacionService
  ) {
    this.notifier = notifierService;

    this.utilEvaluacion = new UtilEvaluacion();
    this.thereIsError = false;
    this.showErrorItem = false;
    this.showErrorPorcentajeCom = false;
    this.errorPorcentaje =
      'La sumatoria del porcentaje del valor del componente seleccionados debe ser 100%';
    this.showErrorPorcentajeEval = false;
    this.errorPorcentajeTraslape =
      'Los valores ingresados para esta escala, están traslapados con valores de otro item';
    this.errorPorcentajeEval =
      'Los rangos de valores ingresados deben sumar un 100%';

    this.total = 0;
    this.TREE_DATA = [];
  }

  treeControl = new NestedTreeControl<Node>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<Node>();

  /***********************VARIABLES LOCALES**************** */
  @Input() titlePanel: { titlePanel: string };
  @Input() titleForm: { titleForm: string };
  @Input() subtitleForm: { subtitleForm: string };
  @Input() buttonAction: { buttonAction: string };
  @ViewChild('tree', { static: false }) tree;

  fieldsForm: FormGroup;

  thereIsError: boolean;
  utilEvaluacion: UtilEvaluacion;
  showErrorItem: boolean;
  showErrorPorcentajeCom: boolean;
  errorPorcentaje: string;
  showErrorPorcentajeEval: boolean;
  errorPorcentajeTraslape: string;
  errorPorcentajeEval: string;

  total: number = 0;
  maxTotal: number = 100;
  pk = 0;

  ngOnInit() {
    this.fieldsForm = this.formBuilder.group({
      codigo: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3),
        ],
      ],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3),
        ],
      ],
      programa: ['', [Validators.required]],
      nivel: ['', [Validators.required]],
      porcMinimo: [0.0],
    });
    this.cargarEntidades();
    this.listaComponentes.map((com) => {
      com.porcentaje = 0;
      com.selected = false;
    });
    /**********************************************************************
     * RECOGE LOS PARAMETROS DE LA URL Y TRAE LE OBJETO PARA MODO EDICIÓN *
     **********************************************************************/
    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.traerObjeto(params['id']);
      } else {
        console.log('Nuevo');
      }
    });
    this.cargarPreseleccion();
  }

  /********************************************************************************
   * TRAE EL OBJETO PRINCIPAL Y LO ASIGNA A LOS CONTROLES DEL FORMULARIO REACTIVO *
   ********************************************************************************/
  traerObjeto(id) {
    // Datos Generales
    this.evaluacionService.obtenerEvaluacion(id).subscribe(
      (data: any) => {
        this.pk = id;
        this.fieldsForm.controls['codigo'].setValue(data.codigo);
        this.fieldsForm.controls['descripcion'].setValue(data.descripcion);
        this.fieldsForm.controls['nivel'].setValue(data.nivel);
        this.fieldsForm.controls['porcMinimo'].setValue(
          data.porcentajeAprobacion
        );
      },
      (error) => {
        console.log('There was an error while retrieving data !!!' + error);
      }
    );
    // Datos Componentes
    this.evaluacionService.obtenerComponentesEvaluacion(id).subscribe(
      (data: any) => {
        this.componentes = data;
        this.componentes.forEach((obj) => {
          this.fieldsForm.controls['programa'].setValue(
            obj.componente.subPrograma.id
          );
          this.listaComponentes.forEach((e) => {
            if (obj.componente.id === e.id) {
              e.selected = true;
              e.porcentaje = obj.valorComponente;
              this.onChangePorcentajeComponentes(e.id, e.porcentaje);
              this.seleccionar(e.id);
            }
          });
        });
        this.onChangePrograma(this.fieldsForm.get('programa').value);
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
    // Datos escala valorativa
    this.evaluacionService.obtenerEscalaValorativa(id).subscribe(
      (data: any) => {
        this.escalas = data;
        this.escalas.forEach((obj) => {
          this.listaEscalaValorativa.forEach((e) => {
            if (obj.nivelEvaluacion.id === e.id) {
              e.porcentaje_desde = obj.porcentajeDesde;
              e.porcentaje_hasta = obj.porcentajeHasta;
            }
          });
        });
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
    // Datos Sub - componentes
    /*this.evaluacionService.obtenerSubComponentesEvaluacion(id).subscribe((data: any) => { this.subComponentes = data;
    }, (error) => { console.log(JSON.stringify(error)); });*/
  }

  /**********************************************************
   * FUNCION QUE AGRUPA LOS LLAMADOS A LAS LISTAS DE COMBOS *
   **********************************************************/
  cargarEntidades() {
    this.evaluacionService.cargarSubProgramas().subscribe(
      (resultado) => {
        this.programas = resultado;
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
    this.evaluacionService.cargarComponentes().subscribe(
      (resultado) => {
        this.listaComponentesGeneral = resultado;
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
    this.evaluacionService.cargarSubComponentes().subscribe(
      (resultado) => {
        this.listaSubComponentes = resultado;
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
    this.evaluacionService.cargarEscalaValorativa().subscribe(
      (resultado) => {
        this.listaEscalaValorativa = resultado;
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }

  cargarPreseleccion() {
    // filtro los pre-seleccionados
    const temp = this.listaComponentes.filter((com) => com.selected);
    // recorro la lista y envío a cargar el arbol para los seleccionados
    for (let index = 0; index < temp.length; index++) {
      this.seleccionar(temp[index].id);
    }
    this.treeControl.dataNodes = this.dataSource.data;
    this.treeControl.expandAll();
  }

  onChangePrograma(programa) {
    this.listaComponentes = [];
    const idSubPrograma: number = this.fieldsForm.get('programa').value;
    this.listaComponentesGeneral.forEach((c) => {
      const idp: number = c.subPrograma.id;
      // tslint:disable-next-line: triple-equals
      if (c.subPrograma.id == idSubPrograma) {
        this.listaComponentes.push(c);
      }
    });

    this.dataService
      .listaEntidadRelacion('Nivel', ['subPrograma'], ['id'], [2])
      .subscribe(
        (data: any) => {
          console.log(JSON.stringify(data));
          this.niveles = data;
        },
        (error) => {
          console.log('Nivel :: > There was an error while retrieving data !!!' + error);
        }
      );
  }

  changeStatus(id, e) {
    const status = e.target.checked;
    if (status) {
      // adicionar
      this.seleccionar(id);
    } else {
      // eliminar
      const removeIndex = this.dataSource.data
        .map(function (item) {
          return item.idPrincipal;
        })
        .indexOf(id);

      this.TREE_DATA.splice(removeIndex, 1);
      this.dataSource.data = this.TREE_DATA;
      this.listaComponentes
        .filter((com) => com.id === id)
        .map((item) => (item.porcentaje = 0));
      this.listaComponentes
        .filter((com) => com.id === id)
        .map((item) => (item.selected = false));
      this.calcularTotal();
    }

    this.treeControl.dataNodes = this.dataSource.data;
    this.treeControl.expandAll();
  }

  public seleccionar(id) {
    const itemComponente = this.listaComponentes.find((com) => com.id === id);
    const itemsSubComponente = this.listaSubComponentes.filter(
      (sub) => sub.componente.id === id
    );
    const childs: Node[] = [];

    itemsSubComponente.forEach(function (item) {
      childs.push({
        name: item.descripcion,
        idPrincipal: itemComponente.id,
        id: item.id,
        selected: false,
        expanded: true,
      });
    });
    // INIT tree test
    const itemTree: Node = {
      name: itemComponente.descripcion,
      idPrincipal: 0,
      expanded: true,
      children: childs,
    };

    this.TREE_DATA.push(itemTree);
    this.dataSource.data = this.TREE_DATA;
    Object.keys(this.dataSource.data).forEach((x) => {
      this.setParent(this.dataSource.data[x], null);
    });
    // END Tree test
    this.calcularTotal();
    this.listaComponentes
      .filter((com) => com.id === id)
      .map((item) => (item.selected = true));
  }
  /** **************************************************************** */
  /** GESTIOS DEL ÁRBOL */
  hasChild = (_: number, node: Node) =>
    // tslint:disable-next-line: semicolon
    !!node.children && node.children.length > 0;
  setParent(data, parent) {
    data.parent = parent;
    if (data.children) {
      data.children.forEach((x) => {
        this.setParent(x, data);
      });
    }
  }

  checkAllParents(node) {
    if (node.parent) {
      const descendants = this.treeControl.getDescendants(node.parent);
      node.parent.selected = descendants.every((child) => child.selected);
      node.parent.indeterminate = descendants.some((child) => child.selected);
      this.checkAllParents(node.parent);
    }
  }
  todoItemSelectionToggle(checked, node) {
    node.selected = checked;
    if (node.children) {
      node.children.forEach((x) => {
        this.todoItemSelectionToggle(checked, x);
      });
    }
    this.checkAllParents(node);
  }

  /* VALIDACIONES DE TABLAS, VALORES DE PORCENTAJE */
  isDisabled(status): boolean {
    return !status;
  }

  isChecked(status): boolean {
    return status;
  }

  changeValue(id, e) {
    const valor = parseFloat(e.target.value);
    this.listaComponentes
      .filter((com) => com.id === id)
      .map((item) => (item.porcentaje = valor));
    this.calcularTotal();
    if (this.total > this.maxTotal) {
      this.notifier.notify('warning', 'La sumatoria de los porcentajes de los componentes debe ser igual a 100 %!');
      this.showErrorPorcentajeCom = true;
    } else {
      this.showErrorPorcentajeCom = false;
    }
  }

  calcularTotal() {
    this.total = 0;
    this.listaComponentes.forEach((item) => {
      if (item.porcentaje) {
        this.total = this.total + item.porcentaje;
      }
    });
  }

  setColorValidacion() {
    const styles = {
      color: this.showErrorPorcentajeCom ? '#D9534F' : 'black',
    };
    return styles;
  }

  public onChangePorcentajeComponentes(id: number, value: number) {
    this.listaComponentes
      .filter((com) => com.id === id)
      .map((item) => (item.porcentaje = value));
    this.calcularTotal();
    if (this.total > this.maxTotal) {
      this.notifier.notify('warning', this.errorPorcentaje);
      this.showErrorPorcentajeCom = true;
    } else {
      this.showErrorPorcentajeCom = false;
    }
  }

  public onChangePorcentajeEvaluacion(
    id: number,
    value: number,
    desdeHasta: boolean
  ) {
    if (desdeHasta === this.desde) {
      const itemBlur = this.listaEscalaValorativa.find((esc) => esc.id === id);
      let porcHasta = itemBlur.porcentaje_hasta;
      if (
        itemBlur.porcentaje_hasta !== null &&
        itemBlur.porcentaje_hasta <= value
      ) {
        porcHasta = null;
      }
      this.listaEscalaValorativa
        .filter((com) => com.id === id)
        .map((item) => {
          item.porcentaje_desde = value;
          item.porcentaje_hasta = porcHasta;
        });
    } else if (desdeHasta === this.hasta) {
      this.listaEscalaValorativa
        .filter((com) => com.id === id)
        .map((item) => (item.porcentaje_hasta = value));
    }
  }

  validarTraslape(id: number): boolean {
    let resul = false;
    const itemBlur = this.listaEscalaValorativa.find((esc) => esc.id === id);
    this.listaEscalaValorativa
      .filter(
        (item) =>
          item.id !== id &&
          item.porcentaje_desde >= 0 &&
          item.porcentaje_hasta > 0
      )
      .forEach((item) => {
        if (
          this.validarValorRango(
            item.porcentaje_desde,
            item.porcentaje_hasta,
            itemBlur.porcentaje_desde
          ) ||
          (itemBlur.porcentaje_hasta > 0 &&
            this.validarValorRango(
              item.porcentaje_desde,
              item.porcentaje_hasta,
              itemBlur.porcentaje_hasta
            ))
        ) {
          resul = true;
        }
      });
    return resul;
  }

  private validarValorRango(
    rangoInicio: number,
    rangoFin: number,
    valor: number
  ): boolean {
    if (valor !== null && valor >= rangoInicio && valor <= rangoFin) {
      return true;
    }
    return false;
  }

  clearForm() {}

  onSubmit() {
    /* Controla la validación del formulario, si es invalido, muestra los mensaje y no permite guardar */
    this.submitted = true;
    if (this.fieldsForm.invalid) {
      return;
    }

    if (this.validarSeleccionCom()) {
      return;
    }

    if (this.validarPorcentajeCom()) {
      return;
    }

    const result = this.getNodesSelected();
    if (result.length === 0) {
      this.notifier.notify(
        'warning',
        'Se debe seleccionar al menos un SubComponente por cada Componete seleccionado');
      return;
    }

    const newEvaluacion: any = {};
    newEvaluacion['id_evaluacion'] = this.pk === 0 ? null : this.pk;
    newEvaluacion['codigo'] = this.fieldsForm.get('codigo').value;
    newEvaluacion['descripcion'] = this.fieldsForm.get('descripcion').value;
    newEvaluacion['id_nivel'] = this.fieldsForm.get('nivel').value;
    newEvaluacion['porcentaje_aprobacion'] = this.fieldsForm.get(
      'porcMinimo'
    ).value;
    newEvaluacion['escalas_valorativas'] = this.prepararEscalas();
    newEvaluacion['componente_evaluacion'] = this.prepararComponentes();

    this.evaluacionService
      .addEvaluacion(newEvaluacion)
      .subscribe((data: any) => {
        if (this.pk > 0) {
          this.notifier.notify(
            'success',
            'La información se ha actualizado correctamente'
          );
        } else {
          this.notifier.notify(
            'success',
            'La información se ha almacenado correctamente'
          );
        }
        setTimeout(() => {
          this.utilService.editar('/esfoder/add-evaluaciones', data.id);
        }, 1000);
      });
  }

  private prepararEscalas(): any {
    const listEscalas: any = [];

    this.listaEscalaValorativa.forEach((e) => {
      const newEsc: any = {};
      const idElemnt = null;
      newEsc['id'] = idElemnt;
      newEsc['id_evaluacion'] = this.pk === 0 ? null : this.pk;
      newEsc['id_nivel_evaluacion'] = e.id;
      newEsc['id_usuario'] = e.usuario;
      newEsc['porcentaje_desde'] = e.porcentaje_desde;
      newEsc['porcentaje_hasta'] = e.porcentaje_hasta;

      listEscalas.push(newEsc);
    });
    return listEscalas;
  }

  private prepararComponentes(): any {
    const listComponentes: any = [];
    const newCom: any = {};
    this.listaComponentes
      .filter((c) => c.selected)
      .forEach((c) => {
        // tslint:disable-next-line: no-shadowed-variable
        const newCom: any = {};
        const idElemnt = null;
        newCom['id'] = idElemnt;
        newCom['id_componente'] = c.id;
        newCom['id_evaluacion'] = this.pk === 0 ? null : this.pk;
        newCom['valor_componente'] = c.porcentaje;
        newCom['sub_componente_evaluacion'] = this.prepararSubComponentes(
          c.id,
          idElemnt
        );

        listComponentes.push(newCom);
      });
    return listComponentes;
  }

  private prepararSubComponentes(idComponente, idCompEval): any {
    const listSubComponentes: any = [];
    this.dataSource.data.forEach((node) => {
      this.treeControl
        .getDescendants(node)
        .filter((x) => x.selected && x.id && x.idPrincipal === idComponente)
        .forEach((x) => {
          const newSub: any = {};
          newSub['id'] = null;
          newSub['id_sub_componente'] = x.id;
          newSub['id_componente_evaluacion'] = idCompEval;

          listSubComponentes.push(newSub);
        });
    });
    return listSubComponentes;
  }

  private validarSeleccionCom(): boolean {
    if (!this.listaComponentes.filter((sel) => sel.selected).length) {
      this.notifier.notify(
        'warning',
        'Se debe seleccionar al menos un Componente'
      );
      return true;
    }
    return false;
  }

  private validarPorcentajeCom(): boolean {
    if (this.total !== 100) {
      this.notifier.notify('warning', this.errorPorcentaje);
      return true;
    }
    return false;
  }

  getNodesSelected(): any {
    let result = [];
    this.dataSource.data.forEach((node) => {
      result = result.concat(
        this.treeControl
          .getDescendants(node)
          .filter((x) => x.selected && x.id)
          .map((x) => x.id)
      );
    });
    return result;
  }

}
