import { Group } from './../../../models/group.model';
import { Component, OnInit, Input } from '@angular/core';
import { group } from '@angular/core/src/animation/dsl';

@Component({
  selector: 'app-group-editor',
  templateUrl: './group-editor.component.html',
  styleUrls: ['./group-editor.component.scss']
})
export class GroupEditorComponent implements OnInit {

  @Input() group: Group;
  displayedColumns: string[] = [ 'name', 'points', 'matchesPlayed', 'matchesWon', 'matchesLost', 'goalsScored', 'goalsConcieved'];

  constructor() { }

  ngOnInit() {}


}
