import { Group } from './../../../models/group.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-group-editor',
  templateUrl: './group-editor.component.html',
  styleUrls: ['./group-editor.component.scss']
})
export class GroupEditorComponent implements OnInit {

  @Input() group: Group;

  constructor() { }

  ngOnInit() {
  }

}
