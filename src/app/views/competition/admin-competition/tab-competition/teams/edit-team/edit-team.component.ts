import { Component, OnInit, Input } from '@angular/core';
import { team } from '../../../../../../model/team.model';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html'
})
export class EditTeamComponent implements OnInit {
  @Input()edit: boolean;
  @Input()team: any;
  @Input()idCompetencia: number;
  constructor() { }

  ngOnInit() {
  }

}
