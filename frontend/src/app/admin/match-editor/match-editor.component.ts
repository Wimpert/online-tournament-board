import { MATCH_UPDATE_EVENT } from './../constants';
import { Match } from './../../../models/match.model';
import { Component, OnInit, Input, ElementRef, OnChanges } from '@angular/core';

@Component({
  selector: 'app-match-editor',
  templateUrl: './match-editor.component.html',
  styleUrls: ['./match-editor.component.scss']
})
export class MatchEditorComponent {

  @Input() match: Match;

  constructor(private element: ElementRef) { }

  matchChanged() {
    this.element.nativeElement.dispatchEvent(new CustomEvent(MATCH_UPDATE_EVENT, {bubbles: true, detail: this.match}));
  }

}
