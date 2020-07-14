import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { NivelesComponent } from './niveles/niveles.component';
import { InstructoresComponent } from './instructores/instructores.component';
import { EvaluacionesComponent } from './evaluacion-rendimiento/evaluaciones.component';
import { AddNivelesComponent } from './niveles/add-niveles/add-niveles.component';
import { EditNivelesComponent } from './niveles/edit-niveles/edit-niveles.component';
import { FormNivelesComponent } from './niveles/form-niveles/form-niveles.component';
import { PlanClaseComponent } from './niveles/gestion-grupos/plan-clase/plan-clase.component';
import { EscenarioDeportivoComponent } from './niveles/gestion-grupos/escenario-deportivo/escenario-deportivo.component';
import { GestionGrupoComponent } from './niveles/gestion-grupos/gestion-grupo.component';

import { AddInstructoresComponent } from './instructores/add-instructores/add-instructores.component';
import { FormInstructorComponent } from './instructores/form-instructor/form-instructor.component';
import { DisponibilidadComponent } from './instructores/disponibilidad/disponibilidad.component';

import { AddEvaluacionesComponent } from './evaluacion-rendimiento/add-evaluaciones/add-evaluaciones.component';
import { FormEvaluacionComponent } from './evaluacion-rendimiento/form-evaluacion/form-evaluacion.component';

import { EsfoderRoutingModule } from './esfoder-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { DataService } from '../../servicios/data.service';
import { UtilService } from '../../servicios/util.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalWindowsModule } from '../modal-windows/modal-windows.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NumericTextBoxModule } from '@progress/kendo-angular-inputs';
import { NivelService } from './niveles/niveles.service';
import { EvaluacionService } from './evaluacion-rendimiento/evaluaciones.service';
import { InstructorService } from './instructores/instructores.service';
import { ModalBuscadorServicioComponent } from './modal-buscador-servicio/buscador-servicio.component';
import { EditEvaluacionesComponent } from './evaluacion-rendimiento/edit-evaluaciones/edit-evaluaciones.component';

/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12,
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10,
    },
  },
};

@NgModule({
  declarations: [
    NivelesComponent,
    InstructoresComponent,
    EvaluacionesComponent,
    AddNivelesComponent,
    EditNivelesComponent,
    FormNivelesComponent,
    AddInstructoresComponent,
    FormInstructorComponent,
    DisponibilidadComponent,
    AddEvaluacionesComponent,
    EditEvaluacionesComponent,
    FormEvaluacionComponent,
    PlanClaseComponent,
    GestionGrupoComponent,
    EscenarioDeportivoComponent,
    ModalBuscadorServicioComponent,
  ],
  imports: [
    NgbModule,
    CommonModule,
    EsfoderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgSelectModule,
    NotifierModule.withConfig(customNotifierOptions),
    ModalWindowsModule,
    ModalModule.forRoot(),
    TimePickerModule,
    MatTreeModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    NumericTextBoxModule,
  ],
  providers: [DataService, UtilService, NivelService, EvaluacionService, InstructorService, { provide: Location }],
  entryComponents: [
    PlanClaseComponent,
    EscenarioDeportivoComponent,
    GestionGrupoComponent,
    DisponibilidadComponent,
    ModalBuscadorServicioComponent,
  ],
})
export class EsfoderModule {}
