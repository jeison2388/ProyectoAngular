import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { team } from '../../../../../../model/team.model';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html'
})
export class EditTeamComponent implements OnInit {
  @Input()edit: boolean;
  @Input()team: any;
  constructor() { }

  ngOnInit() {
  }


}
