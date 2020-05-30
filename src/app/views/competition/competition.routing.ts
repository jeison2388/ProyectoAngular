import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCompetitionComponent } from './add-competition/add-competition.component';
import { AdminCompetitionComponent} from './admin-competition/admin-competition.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Competencias'
    },
    children: [
      {
        path: 'listCompetition',
        component: AddCompetitionComponent,
        data:
        {
          title: 'Listar Competencia'
        }
      },
      {
        path: 'adminCompetition',
        component: AdminCompetitionComponent,
        data:
        {
          title: 'Administración de competiciones'
        }
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetitionRoutingModule { }
