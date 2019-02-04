import { Match } from './../../../models/match.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-match-editor',
  templateUrl: './match-editor.component.html',
  styleUrls: ['./match-editor.component.scss']
})
export class MatchEditorComponent implements OnInit {

  @Input() match: Match;

  constructor() { }

  ngOnInit() {
  }

}
