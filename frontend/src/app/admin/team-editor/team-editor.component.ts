import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../../models/team.model';

@Component({
  selector: 'app-team-editor',
  templateUrl: './team-editor.component.html',
  styleUrls: ['./team-editor.component.scss']
})
export class TeamEditorComponent implements OnInit {

  @Input() team:  Team;

  constructor() { }

  ngOnInit() {
  }

}
