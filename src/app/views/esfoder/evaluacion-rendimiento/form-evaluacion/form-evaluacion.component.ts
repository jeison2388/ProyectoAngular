import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../../servicios/data.service';
import { NotifierService } from 'angular-notifier';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
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
  templateUrl: './form-evaluacion.component.html'
})
export class FormEvaluacionComponent implements OnInit {

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

  constructor(private el: ElementRef,
    private formBuilder: FormBuilder,
    public dataService: DataService,
    public notifierService: NotifierService,
    public router: Router,
    public _location: Location
  ) {
    this.notifier = notifierService;

    this.utilEvaluacion = new UtilEvaluacion();
    this.thereIsError = false;
    this.showErrorItem = false;
    this.showErrorPorcentajeCom = false;
    this.errorPorcentaje = 'La sumatorias del porcentaje de los componentes no puede superar el 100%';
    this.showErrorPorcentajeEval = false;
    this.errorPorcentajeTraslape = 'Los valores ingresados para esta escala, están traslapados con valores de otro item';
    this.errorPorcentajeEval = 'Los rangos de valores ingresados deben sumar un 100%';

    this.total = 0;
    this.TREE_DATA = [];
  }

  treeControl = new NestedTreeControl<Node>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Node>();

  /************************VARIABLES TEMPORALES************* */
  programas: string[] = ['Natación', 'Fútbol', 'Baloncesto', 'Squash'];
  niveles: string[] = ['Nivel I', 'Nivel II', 'Nivel III', 'Nivel IV'];

  /***********************VARIABLES LOCALES**************** */
  @Input() titlePanel: { titlePanel: string };
  @Input() titleForm: { titleForm: string };
  @Input() subtitleForm: { subtitleForm: string };
  @Input() buttonAction: { buttonAction: string };
  @ViewChild('programas', { static: false }) cbx_programas: any;
  @ViewChild('niveles', { static: false }) cbx_niveles: any;
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

  TREE_DATA: Node[];
  listaComponentes: Componente[];
  listaEscalaValorativa: EscalaValorativa[];
  listaSubComponentes: SubComponente[];
  total: number;
  maxTotal: number = 100;
  pk = 0;

  public readonly notifier: NotifierService;

  ngOnInit() {
    this.fieldsForm = this.formBuilder.group({
      codigo: [
        '',
        [Validators.required, Validators.maxLength(50), Validators.minLength(3)]
      ],
      descripcion: [
        '',
        [Validators.required, Validators.maxLength(50), Validators.minLength(3)]
      ],
      porcMinimo: ['']
    });

    const listaTempEV =  this.utilEvaluacion.getEscalaValorativa();
    this.listaEscalaValorativa = listaTempEV.sort((a, b) => (a.orden > b.orden) ? 1 : -1);
    this.listaComponentes = this.utilEvaluacion.getComponentes();
    this.listaSubComponentes = this.utilEvaluacion.getSubComponentes();
    this.cargarPreseleccion();
    // console.log(this.listaComponentes);
    // console.log(this.listaSubComponentes);
  }

  cargarPreseleccion() {
    // filtro los pre-seleccionados
    const temp = this.listaComponentes.filter(com => com.selected);
    // recorro la lista y envío a cargar el arbol para los seleccionados
    for (let index = 0; index < temp.length; index++) {
      this.seleccionar(temp[index].id);
    }
    this.treeControl.dataNodes = this.dataSource.data;
    this.treeControl.expandAll();
  }

  clearForm() {}

  onSubmit() {
    const newNivel = {};
    newNivel['codigo'] = this.fieldsForm.get('codigo').value;
    newNivel['descripcion'] = this.fieldsForm.get('descripcion').value;
    newNivel['programa'] = this.cbx_programas.nativeElement.value;
    newNivel['nivel'] = this.cbx_niveles.nativeElement.value;
  }

  changeStatus(id, e) {
    const status = e.target.checked;
    if (status) {
      // adicionar
      this.seleccionar(id);
    } else {
      // eliminar
      const removeIndex = this.dataSource.data
        .map(function(item) {
          return item.idPrincipal;
        })
        .indexOf(id);
      console.log('RemoveIndex:::' + removeIndex);
      this.TREE_DATA.splice(removeIndex, 1);
      this.dataSource.data = this.TREE_DATA;
      this.listaComponentes.filter(com => com.id === id).map(item => item.porcentaje =  0);
      this.listaComponentes.filter(com => com.id === id).map(item => item.selected = false);
      this.calcularTotal();
    }

    this.treeControl.dataNodes = this.dataSource.data;
    this.treeControl.expandAll();
  }

  public seleccionar(id) {
    const itemComponente = this.listaComponentes.find(com => com.id === id);
    const itemsSubComponente = this.listaSubComponentes.filter(
      sub => sub.id_componente === id
    );
    const childs: Node[] = [];

    itemsSubComponente.forEach(function(item) {
      childs.push({
        name: item.descripcion,
        idPrincipal: 0,
        id: item.id,
        selected: true,
        expanded: true
      });
    });
    // INIT tree test
    const itemTree: Node = {
      name: itemComponente.descripcion,
      idPrincipal: itemComponente.id,
      expanded: true,
      children: childs
    };

    this.TREE_DATA.push(itemTree);
    this.dataSource.data = this.TREE_DATA;
    Object.keys(this.dataSource.data).forEach(x => {
      this.setParent(this.dataSource.data[x], null);
    });
    // END Tree test
    this.calcularTotal();
    this.listaComponentes.filter(com => com.id === id).map(item => item.selected = true);
    // console.log(this.listaComponentes);
  }
  /** **************************************************************** */
  /** GESTIOS DEL ÁRBOL */
  hasChild = (_: number, node: Node) =>
    // tslint:disable-next-line: semicolon
    !!node.children && node.children.length > 0;
  setParent(data, parent) {
    data.parent = parent;
    if (data.children) {
      data.children.forEach(x => {
        this.setParent(x, data);
      });
    }
  }

  checkAllParents(node) {
    if (node.parent) {
      const descendants = this.treeControl.getDescendants(node.parent);
      node.parent.selected = descendants.every(child => child.selected);
      node.parent.indeterminate = descendants.some(child => child.selected);
      this.checkAllParents(node.parent);
    }
  }
  todoItemSelectionToggle(checked, node) {
    node.selected = checked;
    if (node.children) {
      node.children.forEach(x => {
        this.todoItemSelectionToggle(checked, x);
      });
    }
    this.checkAllParents(node);
  }

  submit() {
    let result = [];
    this.dataSource.data.forEach(node => {
      result = result.concat(
        this.treeControl
          .getDescendants(node)
          .filter(x => x.selected && x.id)
          .map(x => x.id)
      );
    });
    console.log(result);
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
    this.listaComponentes.filter(com => com.id === id).map(item => item.porcentaje = valor);
    this.calcularTotal();
    if (this.total > this.maxTotal) {
      this.notifier.notify(
        'warn' + id,
        this.errorPorcentaje + status
      );
      this.showErrorPorcentajeCom = true;
    } else {
      this.showErrorPorcentajeCom = false;
    }
  }

  calcularTotal() {
    this.total = 0;
    this.listaComponentes.forEach(item => this.total += item.porcentaje);
  }

  setColorValidacion() {
    const styles = {
      'color':  this.showErrorPorcentajeCom ? 'red' : 'black',
    };
    return styles;
  }

  public onChangePorcentajeComponentes(id: number, value: number) {
    console.log(value);
    this.listaComponentes.filter(com => com.id === id).map(item => item.porcentaje = value);
    this.calcularTotal();
    if (this.total > this.maxTotal) {
      this.notifier.notify(
        'warn' + id,
        this.errorPorcentaje + status
      );
      this.showErrorPorcentajeCom = true;
    } else {
      this.showErrorPorcentajeCom = false;
    }
  }

  public onChangePorcentajeEvaluacion(id: number, value: number, desdeHasta: boolean) {
   //  console.log(value);
    if (desdeHasta === this.desde) {
      const itemBlur = this.listaEscalaValorativa.find(esc => esc.id === id);
      let porcHasta = itemBlur.porcentaje_hasta;
      if (itemBlur.porcentaje_hasta !== null && itemBlur.porcentaje_hasta <= value) {
        porcHasta = null;
      }
      this.listaEscalaValorativa.filter(com => com.id === id)
        .map(item => {item.porcentaje_desde = value; item.porcentaje_hasta = porcHasta;
        });
    } else if (desdeHasta === this.hasta) {
      this.listaEscalaValorativa.filter(com => com.id === id).map(item => item.porcentaje_hasta = value);
    }
  }

  validarTraslape(id: number): boolean {
    let resul = false;
    const itemBlur = this.listaEscalaValorativa.find(esc => esc.id === id);
    this.listaEscalaValorativa.filter(item => item.id !== id && (item.porcentaje_desde >= 0 && item.porcentaje_hasta > 0))
      .forEach(item => {
        // console.log(item.codigo + '::' + item.porcentaje_desde + ' - ' + item.porcentaje_hasta);
        // console.log(itemBlur.codigo + '::' + itemBlur.porcentaje_desde + ' - ' + itemBlur.porcentaje_hasta);
        if (this.validarValorRango(item.porcentaje_desde, item.porcentaje_hasta, itemBlur.porcentaje_desde)
            || (itemBlur.porcentaje_hasta > 0
                && this.validarValorRango(item.porcentaje_desde, item.porcentaje_hasta, itemBlur.porcentaje_hasta))) {
             console.log(true);
            resul = true;
          }
      });
      return resul;
    }

  private validarValorRango(rangoInicio: number, rangoFin: number, valor: number): boolean {
    if (valor !== null && (valor >= rangoInicio && valor <= rangoFin)) {
      return true;
    }
    return false;
  }
}
