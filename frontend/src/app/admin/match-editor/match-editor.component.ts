import { MATCH_UPDATE_EVENT_NAME } from './../constants';
import { Match } from './../../../models/match.model';
import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-match-editor',
  templateUrl: './match-editor.component.html',
  styleUrls: ['./match-editor.component.scss']
})
export class MatchEditorComponent implements OnInit {

  @Input() match: Match;

  constructor(private element : ElementRef) { }

  ngOnInit() {
  }

  matchChanged(){
    this.element.nativeElement.dispatchEvent(new CustomEvent(MATCH_UPDATE_EVENT_NAME, {bubbles: true, detail: this.match}))
  }

}