import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CompetitionRoutingModule} from './competition.routing';
import {CompetitionService} from './competition.service';
import { ModalWindowsModule } from '../modal-windows/modal-windows.module';
import { FormCompetitionComponent } from './form-competition/form-competition.component';
import { AddCompetitionComponent } from './add-competition/add-competition.component';
import { ListCompetitionNavComponent } from './admin-competition/list-competition-nav/list-competition-nav.component';
import {ListRegistrationValueTeamComponent} from './admin-competition/tab-competition/teams/list-registration-value-team/list-registration-value-team.component';
import { TabCompetitionComponent } from './admin-competition/tab-competition/tab-competition.component';
import { AdminCompetitionComponent } from './admin-competition/admin-competition.component';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ListTeamsComponent } from './admin-competition/tab-competition/teams/list-teams/list-teams.component';
import { AddTeamComponent } from './admin-competition/tab-competition/teams/add-team/add-team.component';
import { FormTeamComponent } from './admin-competition/tab-competition/teams/form-team/form-team.component';
import { AddInfoPlayersComponent } from './admin-competition/tab-competition/teams/form-team/add-info-players/add-info-players.component';
import { AddModalPlayerComponent } from './admin-competition/tab-competition/teams/form-team/add-info-players/add-modal-player/add-modal-player.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditCompetitionComponent } from './edit-competition/edit-competition.component';
import { ClasificationComponent } from './admin-competition/tab-competition/clasification/clasification.component';
import { EquipmentDistributionComponent } from './admin-competition/tab-competition/clasification/equipment-distribution/equipment-distribution.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CompetitionTypeChampioshipComponent } from './admin-competition/tab-competition/clasification/competition-type-champioship/competition-type-champioship.component';
import { FilterPipe } from './admin-competition/pipes/filter.pipe';
import { ListPlayersComponent } from './admin-competition/tab-competition/teams/list-players/list-players.component';
import { ListCompetitionComponent } from './admin-competition/list-competition/list-competition.component';
import { EditTeamComponent } from './admin-competition/tab-competition/teams/edit-team/edit-team.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { PipeCompetitionPipe } from './pipes/pipe-competition.pipe';
import { ProgrammingComponent } from './admin-competition/tab-competition/programming/programming.component';
import { FormProgrammingComponent } from './admin-competition/tab-competition/programming/form-programming/form-programming.component';
import { SelectScenariosComponent } from './admin-competition/tab-competition/programming/select-scenarios/select-scenarios.component';
import { ListProgrammingComponent } from './admin-competition/tab-competition/programming/list-programming/list-programming.component';


@NgModule({
  imports: [
    CommonModule,
    CompetitionRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    ModalWindowsModule,
    TabsModule,
    NgbModule,
    DragDropModule,
    NgxPaginationModule
  ],
  declarations: [FormCompetitionComponent,
                AddCompetitionComponent,
                ListCompetitionNavComponent,
                ListRegistrationValueTeamComponent,
                TabCompetitionComponent,
                AdminCompetitionComponent,
                ListTeamsComponent,
                AddTeamComponent,
                FormTeamComponent,
                AddInfoPlayersComponent,
                AddModalPlayerComponent,
                EditCompetitionComponent,
                ClasificationComponent,
                EquipmentDistributionComponent,
                CompetitionTypeChampioshipComponent,
                FilterPipe,
                ListPlayersComponent,
                ListCompetitionComponent,
                EditTeamComponent,
                PipeCompetitionPipe,
                ProgrammingComponent,
                FormProgrammingComponent,
                SelectScenariosComponent,
                ListProgrammingComponent,
                ],
  providers: [CompetitionService,PipeCompetitionPipe]
})
export class CompetitionModule {}
